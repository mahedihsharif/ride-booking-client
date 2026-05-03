import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ChangePasswordModal from "@/components/modules/auth/ChangePassword";
import UpdateProfileModal from "@/components/modules/profile/UpdateProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { role } from "@/constants/role.constant";
import { globalErrorResponse } from "@/helpers/globalErrorHandler";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useDriverAvailabilityMutation, useDriverInfoQuery, } from "@/redux/features/auth/driver.api";
import { motion } from "framer-motion";
import { Car, Mail, Pencil, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import UpdateVehicleModal from "./driver/vehicle/UpdateVehicleModal";
// --- Data (replace with real data / props) ---
const profile = {
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=256&h=256&fit=crop&crop=faces",
};
// --- Small helper for each field ---
function Field({ label, value }) {
    return (_jsxs("div", { className: "min-w-0", children: [_jsx("div", { className: "text-sm text-muted-foreground font-medium tracking-wide", children: label }), _jsx("div", { className: "mt-1 text-base md:text-lg font-semibold truncate", children: value })] }));
}
// --- Page ---
export default function ViewProfile() {
    const { data: me, isLoading: userLoading } = useUserInfoQuery(undefined);
    const [updateProfileOpen, setUpdateProfileOpen] = useState(false);
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);
    const [updateVehicleOpen, setUpdateVehicleOpen] = useState(false);
    const isDriver = me?.data?.role === role.DRIVER;
    // Driver info fetch only if role is driver
    const { data: driverData, isLoading: driverLoading } = useDriverInfoQuery(undefined, {
        skip: !isDriver,
    });
    const [driverAvailability] = useDriverAvailabilityMutation();
    const [isOnline, setIsOnline] = useState(false);
    // Set initial availability from driver info
    useEffect(() => {
        if (isDriver && driverData?.data) {
            setIsOnline(!!driverData.data.isAvailable);
        }
    }, [driverData, isDriver]);
    // Toggle availability handler
    const handleAvailabilityChange = async (checked) => {
        setIsOnline(checked);
        try {
            if (driverData?.data?._id) {
                const res = await driverAvailability().unwrap();
                if (res.success) {
                    toast.success(res.message);
                }
            }
        }
        catch (error) {
            if (error) {
                const err = globalErrorResponse(error);
                toast.error(err?.data?.message || "Failed to update status");
                setIsOnline(!checked);
            }
        }
    };
    // Show skeleton while loading
    if (userLoading || (isDriver && driverLoading)) {
        return (_jsx("div", { className: "container mx-auto px-4 py-8 max-w-2xl", children: _jsxs(Card, { className: "border rounded-2xl shadow-sm bg-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-xl", children: "My Profile" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(Skeleton, { className: "h-6 w-40" }), _jsx(Skeleton, { className: "h-6 w-56" }), _jsx(Skeleton, { className: "h-6 w-48" }), _jsx(Skeleton, { className: "h-6 w-32" })] })] }) }));
    }
    return (_jsx(TooltipProvider, { children: _jsx("div", { className: "min-h-screen w-full bg-gradient-to-b from-background to-muted/30 dark:from-[#0b0b0d] dark:to-[#0b0b0d]", children: _jsxs("div", { className: "mx-auto max-w-5xl px-4 py-8 md:py-12", children: [_jsx(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 }, children: _jsx(Card, { className: "rounded-3xl border-border/60 bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60", children: _jsx(CardContent, { className: "p-6 md:p-8", children: _jsxs("div", { className: "flex items-start gap-4 md:gap-6", children: [_jsxs(Avatar, { className: "h-20 w-20 md:h-24 md:w-24 ring-2 ring-border", children: [_jsx(AvatarImage, { src: profile.avatarUrl, alt: me?.data?.name }), _jsx(AvatarFallback, { children: "MS" })] }), isDriver && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: `text-sm font-medium ${isOnline ? "text-green-600" : "text-gray-600"}`, children: isOnline ? "Online" : "Offline" }), _jsx(Switch, { checked: isOnline, onCheckedChange: handleAvailabilityChange, className: `${isOnline ? "bg-green-500" : "bg-gray-300"} cursor-pointer` })] })), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("h1", { className: "text-2xl md:text-3xl font-bold tracking-tight", children: me?.data?.name }), _jsx(Badge, { variant: "secondary", className: "mt-3 text-xs md:text-sm px-3 py-1 rounded-xl bg-muted/60", children: me?.data?.role })] }), _jsxs("div", { children: [_jsxs(Button, { variant: "outline", className: "rounded-2xl border-border/70 shadow-sm cursor-pointer mr-3", onClick: () => setUpdateProfileOpen(true), children: [_jsx(Pencil, { className: "mr-2 h-4 w-4" }), " Edit"] }), _jsxs(Button, { variant: "outline", className: "rounded-2xl border-border/70 shadow-sm cursor-pointer", onClick: () => setChangePasswordOpen(true), children: [_jsx(Pencil, { className: "mr-2 h-4 w-4" }), " Change Password"] })] })] }), _jsx(Separator, { className: "my-6" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx(Field, { label: "Name", value: me?.data?.name }), _jsx(Field, { label: "Email", value: _jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [_jsx(Mail, { className: "h-4 w-4 shrink-0 text-muted-foreground" }), _jsx("span", { className: "truncate", children: me?.data?.email })] }) }), _jsx(Field, { label: "Phone", value: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Phone, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: me?.data?.phone })] }) })] })] })] }) }) }) }), isDriver && (_jsx(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35, delay: 0.05 }, className: "mt-6 md:mt-8", children: _jsxs(Card, { className: "rounded-3xl border-border/60 bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60", children: [_jsx(CardHeader, { className: "px-6 md:px-8 pt-6 pb-2", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-xl md:text-2xl", children: "Vehicle Information" }), _jsxs(Button, { variant: "outline", className: "rounded-2xl border-border/70 cursor-pointer", onClick: () => setUpdateVehicleOpen(true), children: [_jsx(Pencil, { className: "mr-2 h-4 w-4" }), " Edit"] })] }) }), _jsxs(CardContent, { className: "px-6 md:px-8 pb-8", children: [_jsx(Separator, { className: "mb-6" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx(Field, { label: "Vehicle Name", value: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Car, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: driverData?.data?.vehicle?.type })] }) }), _jsx(Field, { label: "Vehicle Model", value: driverData?.data?.vehicle?.model }), _jsxs("div", { className: "min-w-0", children: [_jsx("div", { className: "text-sm text-muted-foreground font-medium tracking-wide", children: "License Plate" }), _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx("div", { className: "mt-1 text-base md:text-lg font-semibold truncate cursor-default", children: driverData?.data?.vehicle?.licensePlate }) }), _jsx(TooltipContent, { side: "top", children: _jsx("span", { children: driverData?.data?.vehicle?.licensePlate }) })] })] })] })] })] }) })), _jsx(UpdateVehicleModal, { open: updateVehicleOpen, onOpenChange: setUpdateVehicleOpen }), _jsx(UpdateProfileModal, { open: updateProfileOpen, onOpenChange: setUpdateProfileOpen }), _jsx(ChangePasswordModal, { open: changePasswordOpen, onOpenChange: setChangePasswordOpen })] }) }) }));
}
