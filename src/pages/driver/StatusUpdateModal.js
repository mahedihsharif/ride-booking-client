import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { rideStatus } from "@/constants/ride.constant";
import { globalErrorResponse } from "@/helpers/globalErrorHandler";
import { useSingleRideQuery, useStatusUpdateRideMutation, } from "@/redux/features/auth/driver.api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
export default function StatusUpdateModal({ rides }) {
    const [status, setStatus] = useState(rides?.status);
    const navigate = useNavigate();
    const [statusUpdateRide, { isLoading: updateLoading }] = useStatusUpdateRideMutation();
    // fresh data fetch
    const { data, isFetching } = useSingleRideQuery(rides?._id);
    useEffect(() => {
        if (data?.data?.status) {
            setStatus(data.data.status);
        }
    }, [data?.data?.status]);
    const handleUpdate = async () => {
        try {
            const res = await statusUpdateRide({
                rideId: rides?._id,
                status: { status },
            }).unwrap();
            toast.success(res.message);
            if (status === rideStatus.COMPLETED) {
                navigate("/driver/rides/history");
            }
        }
        catch (error) {
            if (error) {
                const err = globalErrorResponse(error);
                toast.error(err?.data?.message);
            }
        }
    };
    return (_jsx("div", { className: "flex justify-center items-center p-4", children: _jsxs(Card, { className: "w-full max-w-md shadow-lg rounded-2xl", children: [_jsxs(CardHeader, { className: "flex justify-between items-center", children: [_jsx(CardTitle, { className: "text-xl font-semibold", children: "Active Ride Management" }), _jsx(Button, { size: "sm", disabled: isFetching, className: data?.data?.status === rideStatus.PICKED_UP
                                ? "bg-blue-500 text-white"
                                : data?.data?.status === rideStatus.IN_TRANSIT
                                    ? "bg-orange-500 text-white"
                                    : data?.data?.status === rideStatus.COMPLETED
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-300 text-gray-700", children: data?.data?.status || "Pending" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("p", { children: [_jsx("strong", { children: "Rider:" }), " ", rides?.rider?.name || "N/A"] }), _jsxs("p", { children: [_jsx("strong", { children: "Driver:" }), " ", rides?.driver?.name || "N/A"] }), _jsxs("p", { children: [_jsx("strong", { children: "Pickup:" }), " ", rides?.pickupLocation?.address] }), _jsxs("p", { children: [_jsx("strong", { children: "Destination:" }), " ", rides?.destinationLocation?.address] }), _jsxs("p", { children: [_jsx("strong", { children: "Fare:" }), " BDT: ", rides?.fare] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "status", children: "Update Status" }), _jsxs(Select, { value: status, onValueChange: setStatus, children: [_jsx(SelectTrigger, { id: "status", className: "w-full", children: _jsx(SelectValue, { placeholder: "Select status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: rideStatus.PICKED_UP, children: rideStatus.PICKED_UP }), _jsx(SelectItem, { value: rideStatus.IN_TRANSIT, children: rideStatus.IN_TRANSIT }), _jsx(SelectItem, { value: rideStatus.COMPLETED, children: rideStatus.COMPLETED })] })] })] }), _jsx(Button, { className: "w-full mt-2 cursor-pointer", onClick: handleUpdate, disabled: updateLoading, children: updateLoading ? "Updating..." : `Update Status → ${status}` })] })] }) }));
}
