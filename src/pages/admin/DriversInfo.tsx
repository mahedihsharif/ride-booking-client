import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { activeStatus } from "@/constants/admin.constant";
import { globalErrorResponse } from "@/helpers/globalErrorHandler";
import {
  useApprovedDriverMutation,
  useDriversInfoQuery,
  useSuspendDriverMutation,
} from "@/redux/features/admin/admin.api";

import type { IParamsUsers, IResponseDriverData } from "@/types/admin.type";
import { useState } from "react";
import { toast } from "sonner";

export default function DriversInfo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // NEW

  // API hooks
  const {
    data: usersData,
    isLoading,
    refetch,
  } = useDriversInfoQuery({
    page: currentPage,
    limit,
    search: searchTerm || undefined,
    status: statusFilter || undefined,
  } as IParamsUsers);

  const [approveDriver] = useApprovedDriverMutation();
  const [suspendDriver] = useSuspendDriverMutation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const handleStatusChange = async (id: string, value: string) => {
    try {
      if (value === activeStatus.APPROVED) {
        const res = await approveDriver({ id }).unwrap();
        if (res.success) {
          toast.success(res.message);
        }
      } else if (value === activeStatus.SUSPENDED) {
        const res = await suspendDriver({ id }).unwrap();
        if (res.success) {
          toast.success(res.message);
        }
      }
      refetch();
    } catch (error) {
      if (error) {
        const err = globalErrorResponse(error);
        toast.error(err?.data?.message);
      }
    }
  };

  const totalItems = usersData?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  if (isLoading)
    return <Skeleton className="h-[20px] w-[100px] rounded-full" />;

  return (
    <div>
      {/* Search + Status Filter side by side */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2 w-full dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        <div className="min-w-[150px]">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded px-3 py-2 w-full dark:bg-gray-800 dark:text-white"
          >
            <option value="">All Status</option>
            <option value={activeStatus.PENDING}>{activeStatus.PENDING}</option>
            <option value={activeStatus.APPROVED}>
              {activeStatus.APPROVED}
            </option>
            <option value={activeStatus.SUSPENDED}>
              {activeStatus.SUSPENDED}
            </option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersData?.data?.drivers.map(
              (user: Partial<IResponseDriverData>, index: number) => (
                <TableRow
                  key={user._id}
                  className={
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-900"
                      : "bg-white dark:bg-gray-800"
                  }
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="capitalize">
                    {user.isApprovedStatus || "N/A"}
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={user.isApprovedStatus}
                      onValueChange={(value: string) =>
                        handleStatusChange(user._id as string, value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={activeStatus.APPROVED}>
                          {activeStatus.APPROVED}
                        </SelectItem>
                        <SelectItem value={activeStatus.SUSPENDED}>
                          {activeStatus.SUSPENDED}
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
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
