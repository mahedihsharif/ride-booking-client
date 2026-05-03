import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Skeleton } from "@/components/ui/skeleton";
import { rideStatus } from "@/constants/ride.constant";
import { useDriverRidesInfoQuery, useSingleRideQuery, } from "@/redux/features/auth/driver.api";
import { useParams } from "react-router";
import StatusUpdateModal from "./StatusUpdateModal";
const StatusUpdatePage = () => {
    const { id } = useParams();
    // If id is missing or the literal string ":id", we need to find an active ride
    const isIdMissing = !id || id === ":id";
    // Fetch the driver's recent rides to find an active one if no ID is provided
    const { data: ridesData, isLoading: isLoadingRides } = useDriverRidesInfoQuery({ limit: 10 }, // Check the last few rides
    { skip: !isIdMissing });
    // Find the first ride that is not COMPLETED, CANCELLED, REJECTED, or REQUESTED (must be ACCEPTED, PICKED_UP, or IN_TRANSIT)
    const activeRideId = isIdMissing
        ? ridesData?.data?.data?.find((ride) => [
            rideStatus.ACCEPTED,
            rideStatus.PICKED_UP,
            rideStatus.IN_TRANSIT,
        ].includes(ride.status))?._id
        : id;
    const { data, isLoading: isLoadingSingle } = useSingleRideQuery(activeRideId, {
        skip: !activeRideId,
    });
    if (isLoadingRides || isLoadingSingle) {
        return (_jsx("div", { className: "flex justify-center items-center p-8 bg-background", children: _jsxs("div", { className: "w-full max-w-md space-y-4", children: [_jsx(Skeleton, { className: "h-12 w-3/4 rounded-lg" }), _jsx(Skeleton, { className: "h-40 w-full rounded-2xl" }), _jsx(Skeleton, { className: "h-12 w-full rounded-lg" })] }) }));
    }
    if (!activeRideId) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-[400px]", children: _jsx("h1", { className: "text-xl font-semibold text-muted-foreground", children: "No Active Ride Available." }) }));
    }
    return _jsx(_Fragment, { children: data && _jsx(StatusUpdateModal, { rides: data?.data }) });
};
export default StatusUpdatePage;
