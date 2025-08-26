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

import { useRidesInfoQuery } from "@/redux/features/admin/admin.api";
import type { ISingleRideDataForAdmin } from "@/types/ride.type";

import { useState } from "react";

export default function RidesInfo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");
  const [driverFilter, setDriverFilter] = useState("");
  const [riderFilter, setRiderFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // API hook
  const {
    data: ridesData,
    isLoading,
    refetch,
  } = useRidesInfoQuery({
    page: currentPage,
    limit,
    status: statusFilter || undefined,
    driver: driverFilter || undefined,
    rider: riderFilter || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  if (isLoading)
    return <Skeleton className="h-[20px] w-[100px] rounded-full" />;

  const totalItems = ridesData?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  const handleFilterChange = () => {
    setCurrentPage(1);
    refetch();
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div>
          <label className="block mb-1 font-medium">Driver:</label>
          <input
            type="text"
            placeholder="Driver Name"
            value={driverFilter}
            onChange={(e) => setDriverFilter(e.target.value)}
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Rider:</label>
          <input
            type="text"
            placeholder="Rider Name"
            value={riderFilter}
            onChange={(e) => setRiderFilter(e.target.value)}
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
          >
            <option value="">All</option>
            {Object.values(rideStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <button
          onClick={handleFilterChange}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800">
              <TableHead>Rider Name</TableHead>
              <TableHead>Driver Name</TableHead>
              <TableHead>Pickup</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Fare</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {ridesData?.data?.data?.map(
              (ride: ISingleRideDataForAdmin, index) => (
                <TableRow
                  key={ride._id}
                  className={
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-900"
                      : "bg-white dark:bg-gray-800"
                  }
                >
                  <TableCell>{ride.rider ? ride.rider.name : "N/A"}</TableCell>
                  <TableCell>
                    {ride.driver ? ride.driver.name : "N/A"}
                  </TableCell>
                  <TableCell>{ride.pickupLocation.address}</TableCell>
                  <TableCell>{ride.destinationLocation.address}</TableCell>
                  <TableCell>{ride.paymentMethod}</TableCell>
                  <TableCell>{ride.status}</TableCell>
                  <TableCell>{ride.fare}</TableCell>
                  <TableCell>
                    {ride.createdAt &&
                      new Date(ride.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="cursor-pointer"
                  >
                    <PaginationLink isActive={currentPage === page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
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
  );
}
