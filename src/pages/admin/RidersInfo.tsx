import { Card, CardContent } from "@/components/ui/card";
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
import { activeUser } from "@/constants/admin.constant";
import { globalErrorResponse } from "@/helpers/globalErrorHandler";
import {
  useRidersActiveStatusMutation,
  useRidersInfoQuery,
} from "@/redux/features/admin/admin.api";
import type { IUserResponseData } from "@/types";
import type { IParamsUsers } from "@/types/admin.type";
import { useState } from "react";
import { toast } from "sonner";

export default function RidersInfo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const { data: usersData, isLoading } = useRidersInfoQuery({
    page: currentPage,
    limit,
    search: searchTerm || undefined,
    status: statusFilter || undefined,
  } as IParamsUsers);

  const [ridersActiveStatus] = useRidersActiveStatusMutation();

  const totalItems = usersData?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-sm rounded-2xl shadow-md p-4">
        <CardContent className="space-y-4">
          {/* Image Skeleton */}
          <Skeleton className="h-40 w-full rounded-xl" />

          {/* Title Skeleton */}
          <Skeleton className="h-6 w-3/4" />

          {/* Description Skeleton */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          {/* Button Skeleton */}
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      {/* Search & Status Filter */}
      <div className="flex justify-start items-center mb-6 gap-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search
          </button>
        </form>

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
            <option value="">All</option>
            <option value={activeUser.ACTIVE}>{activeUser.ACTIVE}</option>
            <option value={activeUser.BLOCKED}>{activeUser.BLOCKED}</option>
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
            {usersData?.data?.riders?.map(
              (user: IUserResponseData, index: number) => (
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
                  <TableCell>
                    {user.isActive === activeUser.ACTIVE ? (
                      <span className="text-green-500 font-medium">
                        {activeUser.ACTIVE}
                      </span>
                    ) : (
                      <span className="text-red-500 font-medium">
                        {activeUser.BLOCKED}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={user.isActive}
                      onValueChange={async (value) => {
                        try {
                          const res = await ridersActiveStatus({
                            id: user._id,
                            status: { isActive: value },
                          }).unwrap();
                          if (res.success) toast.success(res.message);
                        } catch (error) {
                          if (error) {
                            const errorMsg = globalErrorResponse(error);
                            toast.error(errorMsg?.data?.message);
                          }
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={activeUser.ACTIVE}>
                          {activeUser.ACTIVE}
                        </SelectItem>
                        <SelectItem value={activeUser.BLOCKED}>
                          {activeUser.BLOCKED}
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
