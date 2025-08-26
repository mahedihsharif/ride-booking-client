import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { rideStatus } from "@/constants/ride.constant";
import { useDriverRidesInfoQuery } from "@/redux/features/auth/driver.api";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function DriverHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [statusFilter, setStatusFilter] = useState("");
  const [fareMin, setFareMin] = useState<number | "">("");
  const [fareMax, setFareMax] = useState<number | "">("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const navigate = useNavigate();

  const { data: driverRidesData, isLoading } = useDriverRidesInfoQuery({
    page: currentPage,
    limit,
    status: statusFilter || undefined,
    fareMin: fareMin || undefined,
    fareMax: fareMax || undefined,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
  });

  if (isLoading)
    return <Skeleton className="h-[20px] w-[100px] rounded-full" />;

  const totalItems = driverRidesData?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  const statusOptions = [
    "",
    rideStatus.REQUESTED,
    rideStatus.ACCEPTED,
    rideStatus.PICKED_UP,
    rideStatus.IN_TRANSIT,
    rideStatus.COMPLETED,
    rideStatus.CANCELLED,
    rideStatus.REJECTED,
  ];

  const handleSingleItem = (id: string) => {
    navigate(`/driver/rides/${id}`);
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Status */}
        <div>
          <label htmlFor="statusFilter" className="font-medium mr-2">
            Status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status === "" ? "All" : status}
              </option>
            ))}
          </select>
        </div>

        {/* Fare range */}
        <div>
          <label className="font-medium mr-1">Fare Min:</label>
          <input
            type="number"
            value={fareMin}
            onChange={(e) => {
              setFareMin(e.target.value ? parseInt(e.target.value) : "");
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
            placeholder="Min"
          />
        </div>
        <div>
          <label className="font-medium mr-1">Fare Max:</label>
          <input
            type="number"
            value={fareMax}
            onChange={(e) => {
              setFareMax(e.target.value ? parseInt(e.target.value) : "");
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
            placeholder="Max"
          />
        </div>

        {/* Date range */}
        <div>
          <label className="font-medium mr-1">From:</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label className="font-medium mr-1">To:</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800">
              <TableHead>Driver Name</TableHead>
              <TableHead>Pickup Location</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Fare</TableHead>
              <TableHead>Rider Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {driverRidesData?.data?.data?.map((ride, index) => (
              <TableRow
                key={ride._id}
                className={
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-900 cursor-pointer"
                    : "bg-white dark:bg-gray-800 cursor-pointer"
                }
                onClick={() => handleSingleItem(ride._id)}
              >
                <TableCell>{ride.driver?.name || "N/A"}</TableCell>
                <TableCell>{ride.pickupLocation?.address}</TableCell>
                <TableCell>{ride.destinationLocation?.address}</TableCell>
                <TableCell>৳{ride.fare}</TableCell>
                <TableCell>{ride.rider?.name}</TableCell>
                <TableCell>{ride.status}</TableCell>
                <TableCell>
                  {ride?.createdAt
                    ? new Date(ride.createdAt).toISOString().split("T")[0]
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {totalPages > 1 && (
          <div className="flex justify-end mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="cursor-pointer"
                  >
                    <PaginationLink isActive={currentPage === page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
