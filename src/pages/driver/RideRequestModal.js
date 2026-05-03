"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { globalErrorResponse } from "@/helpers/globalErrorHandler";
import { useAcceptRideMutation, useRejectRideMutation, } from "@/redux/features/auth/driver.api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
export default function RideRequestModal({ rides }) {
    const [acceptRide] = useAcceptRideMutation();
    const [rejectRide] = useRejectRideMutation();
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const handleAccept = async (ride) => {
        try {
            const res = await acceptRide(ride._id).unwrap();
            if (res.success) {
                toast.success(res.message);
                setOpen(false);
                navigate(`/driver/ride-status/${ride._id}`);
            }
        }
        catch (error) {
            if (error) {
                const err = globalErrorResponse(error);
                toast.error(err?.data.message);
            }
        }
    };
    const handleReject = async (rideId) => {
        try {
            const res = await rejectRide(rideId).unwrap();
            toast.success(res.message || "Ride rejected!");
        }
        catch (error) {
            if (error) {
                const err = globalErrorResponse(error);
                toast.error(err?.data.message);
            }
        }
    };
    return (_jsx(Dialog, { open: open, onOpenChange: setOpen, children: _jsxs(DialogContent, { className: "rounded-2xl shadow-lg max-w-md w-full", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "New Ride Requests" }) }), _jsx("div", { className: "space-y-4", children: rides.map((ride, index) => (_jsxs("div", { className: `p-4 rounded-lg border ${index !== rides.length - 1 ? "border-b" : "border-none"}`, children: [_jsxs("p", { children: [_jsx("strong", { children: "Pickup:" }), " ", ride.pickupLocation.address] }), _jsxs("p", { children: [_jsx("strong", { children: "Destination:" }), " ", ride.destinationLocation.address] }), _jsxs("p", { children: [_jsx("strong", { children: "Fare:" }), " BDT: ", ride.fare] }), _jsxs("p", { children: [_jsx("strong", { children: "Passenger:" }), " ", ride.rider?.name] }), _jsxs("div", { className: "flex justify-end gap-2 mt-2", children: [_jsx(Button, { variant: "destructive", size: "sm", onClick: () => handleReject(ride._id), className: "cursor-pointer", children: "Reject" }), _jsx(Button, { size: "sm", onClick: () => handleAccept(ride), className: "cursor-pointer", children: "Accept" })] })] }, ride._id))) })] }) }));
}
