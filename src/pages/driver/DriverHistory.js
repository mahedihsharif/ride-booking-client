import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { rideStatus } from "@/constants/ride.constant";
import { useDriverRidesInfoQuery } from "@/redux/features/auth/driver.api";
import { useState } from "react";
import { useNavigate } from "react-router";
export default function DriverHistory() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(5);
    const [statusFilter, setStatusFilter] = useState("");
    const [fareMin, setFareMin] = useState("");
    const [fareMax, setFareMax] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
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
        return _jsx(Skeleton, { className: "h-[20px] w-[100px] rounded-full" });
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
    const handleSingleItem = (id) => {
        navigate(`/driver/rides/${id}`);
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex flex-wrap items-center gap-4 mb-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "statusFilter", className: "font-medium mr-2", children: "Status:" }), _jsx("select", { id: "statusFilter", value: statusFilter, onChange: (e) => {
                                    setStatusFilter(e.target.value);
                                    setCurrentPage(1);
                                }, className: "border rounded px-2 py-1 dark:bg-gray-800 dark:text-white", children: statusOptions.map((status) => (_jsx("option", { value: status, children: status === "" ? "All" : status }, status))) })] }), _jsxs("div", { children: [_jsx("label", { className: "font-medium mr-1", children: "Fare Min:" }), _jsx("input", { type: "number", value: fareMin, onChange: (e) => {
                                    setFareMin(e.target.value ? parseInt(e.target.value) : "");
                                    setCurrentPage(1);
                                }, className: "border rounded px-2 py-1 dark:bg-gray-800 dark:text-white", placeholder: "Min" })] }), _jsxs("div", { children: [_jsx("label", { className: "font-medium mr-1", children: "Fare Max:" }), _jsx("input", { type: "number", value: fareMax, onChange: (e) => {
                                    setFareMax(e.target.value ? parseInt(e.target.value) : "");
                                    setCurrentPage(1);
                                }, className: "border rounded px-2 py-1 dark:bg-gray-800 dark:text-white", placeholder: "Max" })] }), _jsxs("div", { children: [_jsx("label", { className: "font-medium mr-1", children: "From:" }), _jsx("input", { type: "date", value: dateFrom, onChange: (e) => {
                                    setDateFrom(e.target.value);
                                    setCurrentPage(1);
                                }, className: "border rounded px-2 py-1 dark:bg-gray-800 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "font-medium mr-1", children: "To:" }), _jsx("input", { type: "date", value: dateTo, onChange: (e) => {
                                    setDateTo(e.target.value);
                                    setCurrentPage(1);
                                }, className: "border rounded px-2 py-1 dark:bg-gray-800 dark:text-white" })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { className: "min-w-full", children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "bg-gray-100 dark:bg-gray-800", children: [_jsx(TableHead, { children: "Driver Name" }), _jsx(TableHead, { children: "Pickup Location" }), _jsx(TableHead, { children: "Destination" }), _jsx(TableHead, { children: "Fare" }), _jsx(TableHead, { children: "Rider Name" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Date" })] }) }), _jsx(TableBody, { children: driverRidesData?.data?.data?.map((ride, index) => (_jsxs(TableRow, { className: index % 2 === 0
                                    ? "bg-gray-50 dark:bg-gray-900 cursor-pointer"
                                    : "bg-white dark:bg-gray-800 cursor-pointer", onClick: () => handleSingleItem(ride._id), children: [_jsx(TableCell, { children: ride.driver?.name || "N/A" }), _jsx(TableCell, { children: ride.pickupLocation?.address }), _jsx(TableCell, { children: ride.destinationLocation?.address }), _jsxs(TableCell, { children: ["\u09F3", ride.fare] }), _jsx(TableCell, { children: ride.rider?.name }), _jsx(TableCell, { children: ride.status }), _jsx(TableCell, { children: ride?.createdAt
                                            ? new Date(ride.createdAt).toISOString().split("T")[0]
                                            : "N/A" })] }, ride._id))) })] }) }), _jsx("div", { className: "flex justify-center items-center gap-2 mt-4", children: totalPages > 1 && (_jsx("div", { className: "flex justify-end mt-4", children: _jsx(Pagination, { children: _jsxs(PaginationContent, { children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { onClick: () => setCurrentPage((prev) => Math.max(prev - 1, 1)), className: currentPage === 1
                                            ? "pointer-events-none opacity-50"
                                            : "cursor-pointer" }) }), Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (_jsx(PaginationItem, { onClick: () => setCurrentPage(page), className: "cursor-pointer", children: _jsx(PaginationLink, { isActive: currentPage === page, children: page }) }, page))), _jsx(PaginationItem, { children: _jsx(PaginationNext, { onClick: () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)), className: currentPage === totalPages
                                            ? "pointer-events-none opacity-50"
                                            : "cursor-pointer" }) })] }) }) })) })] }));
}
