import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { rideStatus } from "@/constants/ride.constant";
import { useRidesInfoQuery } from "@/redux/features/admin/admin.api";
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
    const { data: ridesData, isLoading, refetch, } = useRidesInfoQuery({
        page: currentPage,
        limit,
        status: statusFilter || undefined,
        driver: driverFilter || undefined,
        rider: riderFilter || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
    });
    if (isLoading)
        return _jsx(Skeleton, { className: "h-[20px] w-[100px] rounded-full" });
    const totalItems = ridesData?.data?.meta?.total || 0;
    const totalPages = Math.ceil(totalItems / limit);
    const handleFilterChange = () => {
        setCurrentPage(1);
        refetch();
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex flex-wrap gap-4 mb-6 items-end", children: [_jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: "Driver:" }), _jsx("input", { type: "text", placeholder: "Driver Name", value: driverFilter, onChange: (e) => setDriverFilter(e.target.value), className: "border rounded px-2 py-1 dark:bg-gray-800 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: "Rider:" }), _jsx("input", { type: "text", placeholder: "Rider Name", value: riderFilter, onChange: (e) => setRiderFilter(e.target.value), className: "border rounded px-2 py-1 dark:bg-gray-800 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: "Status:" }), _jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "border rounded px-2 py-1 dark:bg-gray-800 dark:text-white", children: [_jsx("option", { value: "", children: "All" }), Object.values(rideStatus).map((status) => (_jsx("option", { value: status, children: status }, status)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: "Start Date:" }), _jsx("input", { type: "date", value: startDate, onChange: (e) => setStartDate(e.target.value), className: "border rounded px-2 py-1 dark:bg-gray-800 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: "End Date:" }), _jsx("input", { type: "date", value: endDate, onChange: (e) => setEndDate(e.target.value), className: "border rounded px-2 py-1 dark:bg-gray-800 dark:text-white" })] }), _jsx("button", { onClick: handleFilterChange, className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "Apply Filters" })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { className: "min-w-full", children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "bg-gray-100 dark:bg-gray-800", children: [_jsx(TableHead, { children: "Rider Name" }), _jsx(TableHead, { children: "Driver Name" }), _jsx(TableHead, { children: "Pickup" }), _jsx(TableHead, { children: "Destination" }), _jsx(TableHead, { children: "Payment" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Fare" }), _jsx(TableHead, { children: "Date" })] }) }), _jsx(TableBody, { children: ridesData?.data?.data?.map((ride, index) => (_jsxs(TableRow, { className: index % 2 === 0
                                    ? "bg-gray-50 dark:bg-gray-900"
                                    : "bg-white dark:bg-gray-800", children: [_jsx(TableCell, { children: ride.rider ? ride.rider.name : "N/A" }), _jsx(TableCell, { children: ride.driver ? ride.driver.name : "N/A" }), _jsx(TableCell, { children: ride.pickupLocation.address }), _jsx(TableCell, { children: ride.destinationLocation.address }), _jsx(TableCell, { children: ride.paymentMethod }), _jsx(TableCell, { className: "font-medium", children: _jsx("span", { className: ride.status === rideStatus.COMPLETED
                                                ? "text-green-500 font-medium"
                                                : [rideStatus.REJECTED, rideStatus.CANCELLED].includes(ride.status)
                                                    ? "text-red-500 font-medium"
                                                    : [
                                                        rideStatus.ACCEPTED,
                                                        rideStatus.PICKED_UP,
                                                        rideStatus.IN_TRANSIT,
                                                    ].includes(ride.status)
                                                        ? "text-blue-500 font-medium"
                                                        : "text-gray-500 font-medium", children: ride.status }) }), _jsx(TableCell, { children: ride.fare }), _jsx(TableCell, { children: ride.createdAt &&
                                            new Date(ride.createdAt).toLocaleDateString() })] }, ride._id))) })] }) }), totalPages > 1 && (_jsx("div", { className: "flex justify-center items-center gap-2 mt-4", children: _jsx(Pagination, { children: _jsxs(PaginationContent, { children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { onClick: () => setCurrentPage((prev) => Math.max(prev - 1, 1)), className: currentPage === 1
                                        ? "pointer-events-none opacity-50"
                                        : "cursor-pointer" }) }), Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (_jsx(PaginationItem, { onClick: () => setCurrentPage(page), className: "cursor-pointer", children: _jsx(PaginationLink, { isActive: currentPage === page, children: page }) }, page))), _jsx(PaginationItem, { children: _jsx(PaginationNext, { onClick: () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)), className: currentPage === totalPages
                                        ? "pointer-events-none opacity-50"
                                        : "cursor-pointer" }) })] }) }) }))] }));
}
