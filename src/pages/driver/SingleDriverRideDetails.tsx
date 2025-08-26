/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { rideStatus } from "@/constants/ride.constant";
import { useSingleRideQuery } from "@/redux/features/auth/driver.api";
import { Car, Clock, User } from "lucide-react";
import { useParams } from "react-router";

export default function SingleDriverRideDetails() {
  const { id } = useParams();

  const { data, isLoading } = useSingleRideQuery(id!);

  if (isLoading) {
    return <Skeleton className="h-[40px] w-full rounded-lg" />;
  }

  const ride = data?.data;

  return (
    <div className="flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl border">
        {/* Header */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Car className="w-6 h-6 text-primary" />
              Ride Request to {ride?.destinationLocation.address}
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-1">
              Request ID: {ride?._id}
            </p>
          </div>
          <Badge
            className={`px-4 py-1 text-sm
              ${
                ride?.status === rideStatus.REQUESTED
                  ? "bg-blue-500 text-white dark:bg-blue-700"
                  : ride?.status === rideStatus.ACCEPTED
                  ? "bg-green-500 text-white dark:bg-green-700"
                  : ride?.status === rideStatus.PICKED_UP
                  ? "bg-yellow-400 text-black dark:bg-yellow-600 dark:text-black"
                  : ride?.status === rideStatus.IN_TRANSIT
                  ? "bg-purple-500 text-white dark:bg-purple-700"
                  : ride?.status === rideStatus.COMPLETED
                  ? "bg-emerald-500 text-white dark:bg-emerald-700"
                  : ride?.status === rideStatus.CANCELLED
                  ? "bg-red-500 text-white dark:bg-red-700"
                  : ride?.status === rideStatus.REJECTED
                  ? "bg-gray-500 text-white dark:bg-gray-700"
                  : "bg-secondary text-black dark:text-white"
              }`}
          >
            {ride?.status}
          </Badge>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-6 mt-4">
          {/* Request Info */}
          <div>
            <h3 className="text-lg font-semibold">Request Details</h3>
            <p className="text-muted-foreground mt-2">
              <span className="font-medium">Pickup:</span>{" "}
              {ride?.pickupLocation?.address}
            </p>
            <p className="text-muted-foreground mt-1">
              <span className="font-medium">Destination:</span>{" "}
              {ride?.destinationLocation?.address}
            </p>
            <p className="text-sm mt-2">
              <span className="font-medium">Date:</span>{" "}
              {new Date(ride?.createdAt!).toLocaleString()}
            </p>
            <p className="text-sm mt-1">
              <span className="font-medium">Fare:</span> ৳{ride?.fare}
            </p>
            <p className="text-sm mt-1">
              <span className="font-medium">Payment Method:</span>{" "}
              {ride?.paymentMethod}
            </p>
          </div>

          <Separator />

          {/* Requester Info */}
          <div>
            <h3 className="text-lg font-semibold">Requester</h3>
            <div className="flex items-center gap-3 mt-3">
              <Avatar>
                <AvatarImage src={""} />
                <AvatarFallback>{ride?.rider?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{ride?.rider?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {ride?.rider?.email}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Driver Info */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="w-5 h-5" /> Driver
            </h3>
            {ride?.driver ? (
              <div className="mt-3">
                <p className="font-medium">{ride.driver.name}</p>
                <p className="text-sm text-muted-foreground">
                  {ride.driver.email}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mt-2">Not Assigned</p>
            )}
          </div>

          <Separator />

          {/* Timestamps */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5" /> Timestamps
            </h3>
            <p className="text-sm mt-2">
              <span className="font-medium">Created At:</span>{" "}
              {new Date(ride?.createdAt!).toLocaleString()}
            </p>
            <p className="text-sm mt-1">
              <span className="font-medium">Last Updated:</span>{" "}
              {new Date(ride?.updatedAt!).toLocaleString()}
            </p>
          </div>

          <Separator />

          {/* Ride Status Timeline */}
          <div>
            <h3 className="text-lg font-semibold">Ride Status Timeline</h3>
            <div className="mt-3 space-y-2">
              {ride?.history?.map((h: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-sm p-2 rounded-md border dark:border-gray-700"
                >
                  <Badge
                    variant="outline"
                    className="min-w-[100px] justify-center"
                  >
                    {h.status}
                  </Badge>
                  <span className="text-muted-foreground">
                    {new Date(h.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
