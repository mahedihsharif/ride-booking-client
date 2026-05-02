import { Skeleton } from "@/components/ui/skeleton";
import { rideStatus } from "@/constants/ride.constant";
import {
  useDriverRidesInfoQuery,
  useSingleRideQuery,
} from "@/redux/features/auth/driver.api";
import { useParams } from "react-router";
import StatusUpdateModal from "./StatusUpdateModal";

const StatusUpdatePage = () => {
  const { id } = useParams();

  // If id is missing or the literal string ":id", we need to find an active ride
  const isIdMissing = !id || id === ":id";

  // Fetch the driver's recent rides to find an active one if no ID is provided
  const { data: ridesData, isLoading: isLoadingRides } = useDriverRidesInfoQuery(
    { limit: 10 }, // Check the last few rides
    { skip: !isIdMissing }
  );

  // Find the first ride that is not COMPLETED, CANCELLED, REJECTED, or REQUESTED (must be ACCEPTED, PICKED_UP, or IN_TRANSIT)
  const activeRideId = isIdMissing
    ? ridesData?.data?.data?.find((ride) =>
        [
          rideStatus.ACCEPTED,
          rideStatus.PICKED_UP,
          rideStatus.IN_TRANSIT,
        ].includes(ride.status)
      )?._id
    : id;

  const { data, isLoading: isLoadingSingle } = useSingleRideQuery(
    activeRideId!,
    {
      skip: !activeRideId,
    }
  );

  if (isLoadingRides || isLoadingSingle) {
    return (
      <div className="flex justify-center items-center p-8 bg-background">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-12 w-3/4 rounded-lg" />
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (!activeRideId) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <h1 className="text-xl font-semibold text-muted-foreground">
          No Active Ride Available.
        </h1>
      </div>
    );
  }

  return <>{data && <StatusUpdateModal rides={data?.data} />}</>;
};

export default StatusUpdatePage;
