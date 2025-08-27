import { Skeleton } from "@/components/ui/skeleton";
import { useSingleRideQuery } from "@/redux/features/auth/driver.api";
import { useParams } from "react-router";
import StatusUpdateModal from "./StatusUpdateModal";

const StatusUpdatePage = () => {
  const { id } = useParams();

  const { data, isLoading } = useSingleRideQuery(id!, { skip: !id });
  if (isLoading) {
    <Skeleton className="h-[20px] w-[100px] rounded-full" />;
  }
  if (!id) {
    return (
      <div className="flex items-center justify-center">
        <h1>No Ride Request Available now.</h1>
      </div>
    );
  }
  return <>{!isLoading && data && <StatusUpdateModal rides={data?.data} />}</>;
};
export default StatusUpdatePage;
