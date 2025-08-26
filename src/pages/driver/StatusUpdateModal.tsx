import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { rideStatus } from "@/constants/ride.constant";
import { globalErrorResponse } from "@/helpers/globalErrorHandler";
import {
  useSingleRideQuery,
  useStatusUpdateRideMutation,
} from "@/redux/features/auth/driver.api";
import type { ISingleRideData } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface IProps {
  rides: ISingleRideData;
}

export default function StatusUpdateModal({ rides }: IProps) {
  const [status, setStatus] = useState(rides?.status);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [statusUpdateRide] = useStatusUpdateRideMutation();
  const { data } = useSingleRideQuery({ id: rides?._id });

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await statusUpdateRide({
        rideId: rides?._id,
        status: { status },
      });

      if (res.data?.success) {
        toast.success(res.data.message);
        if (status === rideStatus.COMPLETED) {
          navigate("/driver/rides/history");
        }
      } else if (res?.error) {
        if (res?.error) {
          const err = globalErrorResponse(res?.error);
          toast.error(err?.data.message);
        }
      }
    } catch (error) {
      if (error) {
        const err = globalErrorResponse(error);
        toast.error(err?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">
            Active Ride Management
          </CardTitle>
          <Button
            size="sm"
            className={
              data?.data.status === rideStatus.PICKED_UP
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : data?.data.status === rideStatus.IN_TRANSIT
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : data?.data.status === rideStatus.COMPLETED
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }
          >
            {data?.data.status || "Pending"}
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p>
              <strong>Rider:</strong> {rides?.rider?.name || "N/A"}
            </p>
            <p>
              <strong>Driver:</strong> {rides?.driver?.name || "N/A"}
            </p>
            <p>
              <strong>Pickup:</strong> {rides?.pickupLocation.address}
            </p>
            <p>
              <strong>Destination:</strong> {rides?.destinationLocation.address}
            </p>
            <p>
              <strong>Fare:</strong> BDT: {rides?.fare}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Update Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={rideStatus.PICKED_UP}>
                  {rideStatus.PICKED_UP}
                </SelectItem>
                <SelectItem value={rideStatus.IN_TRANSIT}>
                  {rideStatus.IN_TRANSIT}
                </SelectItem>
                <SelectItem value={rideStatus.COMPLETED}>
                  {rideStatus.COMPLETED}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full mt-2 cursor-pointer"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : `Update Status → ${status}`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
