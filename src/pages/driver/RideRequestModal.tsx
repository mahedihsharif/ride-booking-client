"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { globalErrorResponse } from "@/helpers/globalErrorHandler";
import {
  useAcceptRideMutation,
  useRejectRideMutation,
} from "@/redux/features/auth/driver.api";
import type { ISingleRideData } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface IProps {
  rides: ISingleRideData[]; // array of ride requests
}

export default function RideRequestModal({ rides }: IProps) {
  const [acceptRide] = useAcceptRideMutation();
  const [rejectRide] = useRejectRideMutation();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleAccept = async (ride: ISingleRideData) => {
    try {
      const res = await acceptRide(ride._id).unwrap();
      if (res.success) {
        toast.success(res.message);
        setOpen(false);
        navigate(`/driver/ride-status/${ride._id}`);
      }
    } catch (error) {
      if (error) {
        const err = globalErrorResponse(error);
        toast.error(err?.data.message);
      }
    }
  };

  const handleReject = async (rideId: string) => {
    try {
      const res = await rejectRide(rideId).unwrap();
      toast.success(res.message || "Ride rejected!");
    } catch (error) {
      if (error) {
        const err = globalErrorResponse(error);
        toast.error(err?.data.message);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-2xl shadow-lg max-w-md w-full">
        <DialogHeader>
          <DialogTitle>New Ride Requests</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {rides.map((ride, index) => (
            <div
              key={ride._id}
              className={`p-4 rounded-lg border ${
                index !== rides.length - 1 ? "border-b" : "border-none"
              }`}
            >
              <p>
                <strong>Pickup:</strong> {ride.pickupLocation.address}
              </p>
              <p>
                <strong>Destination:</strong> {ride.destinationLocation.address}
              </p>
              <p>
                <strong>Fare:</strong> BDT: {ride.fare}
              </p>
              <p>
                <strong>Passenger:</strong> {ride.rider?.name}
              </p>
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleReject(ride._id)}
                  className="cursor-pointer"
                >
                  Reject
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleAccept(ride)}
                  className="cursor-pointer"
                >
                  Accept
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
