import ChangePasswordModal from "@/components/modules/auth/ChangePassword";
import UpdateProfileModal from "@/components/modules/profile/UpdateProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { role } from "@/constants/role.constant";
import { globalErrorResponse } from "@/helpers/globalErrorHandler";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import {
  useDriverAvailabilityMutation,
  useDriverInfoQuery,
} from "@/redux/features/auth/driver.api";
import { motion } from "framer-motion";
import { Car, Mail, Pencil, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import UpdateVehicleModal from "./driver/vehicle/UpdateVehicleModal";

// --- Data (replace with real data / props) ---
const profile = {
  avatarUrl:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=256&h=256&fit=crop&crop=faces",
};

// --- Small helper for each field ---
function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <div className="text-sm text-muted-foreground font-medium tracking-wide">
        {label}
      </div>
      <div className="mt-1 text-base md:text-lg font-semibold truncate">
        {value}
      </div>
    </div>
  );
}

// --- Page ---
export default function ViewProfile() {
  const { data: me, isLoading: userLoading } = useUserInfoQuery(undefined);
  const [updateProfileOpen, setUpdateProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [updateVehicleOpen, setUpdateVehicleOpen] = useState(false);
  const isDriver = me?.data?.role === role.DRIVER;

  // Driver info fetch only if role is driver
  const { data: driverData, isLoading: driverLoading } = useDriverInfoQuery(
    undefined,
    {
      skip: !isDriver,
    }
  );

  const [driverAvailability] = useDriverAvailabilityMutation();
  const [isOnline, setIsOnline] = useState(false);

  // Set initial availability from driver info
  useEffect(() => {
    if (isDriver && driverData?.data) {
      setIsOnline(!!driverData.data.isAvailable);
    }
  }, [driverData, isDriver]);

  // Toggle availability handler
  const handleAvailabilityChange = async (checked: boolean) => {
    setIsOnline(checked);
    try {
      if (driverData?.data?._id) {
        const res = await driverAvailability().unwrap();
        if (res.success) {
          toast.success(res.message);
        }
      }
    } catch (error) {
      if (error) {
        const err = globalErrorResponse(error);
        toast.error(err?.data?.message || "Failed to update status");
        setIsOnline(!checked);
      }
    }
  };

  // Show skeleton while loading
  if (userLoading || (isDriver && driverLoading)) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="border rounded-2xl shadow-sm bg-card">
          <CardHeader>
            <CardTitle className="text-xl">My Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-56" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-6 w-32" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen w-full bg-gradient-to-b from-background to-muted/30 dark:from-[#0b0b0d] dark:to-[#0b0b0d]">
        <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
          {/* Top profile banner */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Card className="rounded-3xl border-border/60 bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4 md:gap-6">
                  <Avatar className="h-20 w-20 md:h-24 md:w-24 ring-2 ring-border">
                    <AvatarImage src={profile.avatarUrl} alt={me?.data?.name} />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  {isDriver && (
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium ${
                          isOnline ? "text-green-600" : "text-gray-600"
                        }`}
                      >
                        {isOnline ? "Online" : "Offline"}
                      </span>
                      <Switch
                        checked={isOnline}
                        onCheckedChange={handleAvailabilityChange}
                        className={`${
                          isOnline ? "bg-green-500" : "bg-gray-300"
                        } cursor-pointer`}
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                          {me?.data?.name}
                        </h1>
                        <Badge
                          variant="secondary"
                          className="mt-3 text-xs md:text-sm px-3 py-1 rounded-xl bg-muted/60"
                        >
                          {me?.data?.role}
                        </Badge>
                      </div>

                      <div>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-border/70 shadow-sm cursor-pointer mr-3"
                          onClick={() => setUpdateProfileOpen(true)}
                        >
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-border/70 shadow-sm cursor-pointer"
                          onClick={() => setChangePasswordOpen(true)}
                        >
                          <Pencil className="mr-2 h-4 w-4" /> Change Password
                        </Button>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Profile information grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Field label="Name" value={me?.data?.name} />
                      <Field
                        label="Email"
                        value={
                          <div className="flex items-center gap-2 min-w-0">
                            <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <span className="truncate">{me?.data?.email}</span>
                          </div>
                        }
                      />
                      <Field
                        label="Phone"
                        value={
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{me?.data?.phone}</span>
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {isDriver && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="mt-6 md:mt-8"
            >
              <Card className="rounded-3xl border-border/60 bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60">
                <CardHeader className="px-6 md:px-8 pt-6 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl md:text-2xl">
                      Vehicle Information
                    </CardTitle>
                    <Button
                      variant="outline"
                      className="rounded-2xl border-border/70 cursor-pointer"
                      onClick={() => setUpdateVehicleOpen(true)}
                    >
                      <Pencil className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-6 md:px-8 pb-8">
                  <Separator className="mb-6" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Field
                      label="Vehicle Name"
                      value={
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span>{driverData?.data?.vehicle?.type}</span>
                        </div>
                      }
                    />
                    <Field
                      label="Vehicle Model"
                      value={driverData?.data?.vehicle?.model}
                    />

                    <div className="min-w-0">
                      <div className="text-sm text-muted-foreground font-medium tracking-wide">
                        License Plate
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="mt-1 text-base md:text-lg font-semibold truncate cursor-default">
                            {driverData?.data?.vehicle?.licensePlate}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <span>{driverData?.data?.vehicle?.licensePlate}</span>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          <UpdateVehicleModal
            open={updateVehicleOpen}
            onOpenChange={setUpdateVehicleOpen}
          />
          <UpdateProfileModal
            open={updateProfileOpen}
            onOpenChange={setUpdateProfileOpen}
          />
          <ChangePasswordModal
            open={changePasswordOpen}
            onOpenChange={setChangePasswordOpen}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
