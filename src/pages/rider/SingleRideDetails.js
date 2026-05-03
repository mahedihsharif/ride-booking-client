import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { rideStatus } from "@/constants/ride.constant";
import { useGetSingleRideQuery } from "@/redux/features/rides/ride.api";
import { Car, Clock, User, RotateCcw } from "lucide-react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
export default function SingleRiderRideDetails() {
    const { id } = useParams();
    const { data, isLoading, isError, error, refetch, } = useGetSingleRideQuery(id);
    if (isLoading) {
        return (_jsx("div", { className: "flex justify-center items-center p-6 bg-background", children: _jsxs("div", { className: "w-full max-w-3xl space-y-6", children: [_jsx(Skeleton, { className: "h-32 w-full rounded-2xl" }), _jsx(Skeleton, { className: "h-40 w-full rounded-2xl" }), _jsx(Skeleton, { className: "h-40 w-full rounded-2xl" }), _jsx(Skeleton, { className: "h-32 w-full rounded-2xl" })] }) }));
    }
    if (isError) {
        const errorMsg = error?.data?.message || "An error occurred while fetching ride details.";
        return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-[400px] text-center p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-red-500 mb-2", children: "Error" }), _jsx("p", { className: "text-muted-foreground mb-4", children: errorMsg }), _jsxs(Button, { onClick: () => refetch(), variant: "outline", className: "flex items-center gap-2", children: [_jsx(RotateCcw, { className: "w-4 h-4" }), " Retry"] })] }));
    }
    const ride = data?.data;
    if (!ride) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-[400px] text-center p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-muted-foreground mb-2", children: "Ride Information Not Available" }), _jsx("p", { className: "text-muted-foreground max-w-md", children: "We couldn't find any ride with this ID. It may have been deleted or the link might be incorrect." })] }));
    }
    return (_jsx("div", { className: "flex items-center justify-center p-6 bg-background", children: _jsxs(Card, { className: "w-full max-w-3xl shadow-xl rounded-2xl border", children: [_jsxs(CardHeader, { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3", children: [_jsxs("div", { children: [_jsxs(CardTitle, { className: "text-2xl font-bold flex items-center gap-2", children: [_jsx(Car, { className: "w-6 h-6 text-primary" }), "Ride Request to ", ride?.destinationLocation?.address] }), _jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: ["Request ID: ", ride?._id] })] }), _jsx(Badge, { className: `px-4 py-1 text-sm
              ${ride?.status === rideStatus.REQUESTED
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
                                                        : "bg-secondary text-black dark:text-white"}`, children: ride?.status })] }), _jsx(Separator, {}), _jsxs(CardContent, { className: "space-y-6 mt-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: "Request Details" }), _jsxs("p", { className: "text-muted-foreground mt-2", children: [_jsx("span", { className: "font-medium", children: "Pickup:" }), " ", ride?.pickupLocation?.address] }), _jsxs("p", { className: "text-muted-foreground mt-1", children: [_jsx("span", { className: "font-medium", children: "Destination:" }), " ", ride?.destinationLocation?.address] }), _jsxs("p", { className: "text-sm mt-2", children: [_jsx("span", { className: "font-medium", children: "Date:" }), " ", ride?.createdAt ? new Date(ride.createdAt).toLocaleString() : "N/A"] }), _jsxs("p", { className: "text-sm mt-1", children: [_jsx("span", { className: "font-medium", children: "Fare:" }), " \u09F3", ride?.fare] }), _jsxs("p", { className: "text-sm mt-1", children: [_jsx("span", { className: "font-medium", children: "Payment Method:" }), " ", ride?.paymentMethod] })] }), _jsx(Separator, {}), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: "Requester" }), _jsxs("div", { className: "flex items-center gap-3 mt-3", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "" }), _jsx(AvatarFallback, { children: ride?.rider?.name?.charAt(0) })] }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: ride?.rider?.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: ride?.rider?.email })] })] })] }), _jsx(Separator, {}), _jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold flex items-center gap-2", children: [_jsx(User, { className: "w-5 h-5" }), " Driver"] }), ride?.driver ? (_jsxs("div", { className: "mt-3", children: [_jsx("p", { className: "font-medium", children: ride.driver.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: ride.driver.email })] })) : (_jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Not Assigned" }))] }), _jsx(Separator, {}), _jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold flex items-center gap-2", children: [_jsx(Clock, { className: "w-5 h-5" }), " Timestamps"] }), _jsxs("p", { className: "text-sm mt-2", children: [_jsx("span", { className: "font-medium", children: "Created At:" }), " ", ride?.createdAt ? new Date(ride.createdAt).toLocaleString() : "N/A"] }), _jsxs("p", { className: "text-sm mt-1", children: [_jsx("span", { className: "font-medium", children: "Last Updated:" }), " ", ride?.updatedAt ? new Date(ride.updatedAt).toLocaleString() : "N/A"] })] }), _jsx(Separator, {}), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: "Ride Status Timeline" }), _jsx("div", { className: "mt-3 space-y-2", children: ride?.history?.map((h, idx) => (_jsxs("div", { className: "flex items-center gap-3 text-sm p-2 rounded-md border dark:border-gray-700", children: [_jsx(Badge, { variant: "outline", className: "min-w-[100px] justify-center", children: h.status }), _jsx("span", { className: "text-muted-foreground", children: new Date(h.timestamp).toLocaleString() })] }, idx))) })] })] })] }) }));
}
