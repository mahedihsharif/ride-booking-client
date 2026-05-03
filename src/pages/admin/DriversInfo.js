import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { activeStatus } from "@/constants/admin.constant";
import { globalErrorResponse } from "@/helpers/globalErrorHandler";
import { useApprovedDriverMutation, useDriversInfoQuery, useSuspendDriverMutation, } from "@/redux/features/admin/admin.api";
import { useState } from "react";
import { toast } from "sonner";
export default function DriversInfo() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState(""); // NEW
    // API hooks
    const { data: usersData, isLoading, refetch, } = useDriversInfoQuery({
        page: currentPage,
        limit,
        search: searchTerm || undefined,
        status: statusFilter || undefined,
    });
    const [approveDriver] = useApprovedDriverMutation();
    const [suspendDriver] = useSuspendDriverMutation();
    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        refetch();
    };
    const handleStatusChange = async (id, value) => {
        try {
            if (value === activeStatus.APPROVED) {
                const res = await approveDriver({ id }).unwrap();
                if (res.success) {
                    toast.success(res.message);
                }
            }
            else if (value === activeStatus.SUSPENDED) {
                const res = await suspendDriver({ id }).unwrap();
                if (res.success) {
                    toast.error(res.message);
                }
            }
            refetch();
        }
        catch (error) {
            if (error) {
                const err = globalErrorResponse(error);
                toast.error(err?.data?.message);
            }
        }
    };
    const totalItems = usersData?.data?.meta?.total || 0;
    const totalPages = Math.ceil(totalItems / limit);
    if (isLoading) {
        return (_jsx(Card, { className: "w-full max-w-sm rounded-2xl shadow-md p-4", children: _jsxs(CardContent, { className: "space-y-4", children: [_jsx(Skeleton, { className: "h-40 w-full rounded-xl" }), _jsx(Skeleton, { className: "h-6 w-3/4" }), _jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-5/6" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Skeleton, { className: "h-10 w-24 rounded-lg" }), _jsx(Skeleton, { className: "h-10 w-24 rounded-lg" })] })] }) }));
    }
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex flex-wrap gap-4 items-center mb-6", children: [_jsxs("form", { onSubmit: handleSearch, className: "flex gap-2", children: [_jsx("input", { type: "text", placeholder: "Search by name, email or phone...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "border rounded px-3 py-2 w-full dark:bg-gray-800 dark:text-white" }), _jsx("button", { type: "submit", className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "Search" })] }), _jsx("div", { className: "min-w-[150px]", children: _jsxs("select", { value: statusFilter, onChange: (e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }, className: "border rounded px-3 py-2 w-full dark:bg-gray-800 dark:text-white", children: [_jsx("option", { value: "", children: "All Status" }), _jsx("option", { value: activeStatus.PENDING, children: activeStatus.PENDING }), _jsx("option", { value: activeStatus.APPROVED, children: activeStatus.APPROVED }), _jsx("option", { value: activeStatus.SUSPENDED, children: activeStatus.SUSPENDED })] }) })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { className: "min-w-full", children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "bg-gray-100 dark:bg-gray-800", children: [_jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "Email" }), _jsx(TableHead, { children: "Phone" }), _jsx(TableHead, { children: "Role" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Action" })] }) }), _jsx(TableBody, { children: (Array.isArray(usersData?.data)
                                ? usersData?.data
                                : usersData?.data?.drivers ||
                                    usersData?.data?.data ||
                                    []).map((user, index) => (_jsxs(TableRow, { className: index % 2 === 0
                                    ? "bg-gray-50 dark:bg-gray-900"
                                    : "bg-white dark:bg-gray-800", children: [_jsx(TableCell, { children: user.name }), _jsx(TableCell, { children: user.email }), _jsx(TableCell, { children: user.phone }), _jsx(TableCell, { children: user.role }), _jsx(TableCell, { className: "capitalize font-medium", children: user.isApprovedStatus === activeStatus.APPROVED ? (_jsx("span", { className: "text-green-500 font-medium", children: activeStatus.APPROVED })) : user.isApprovedStatus === activeStatus.SUSPENDED ? (_jsx("span", { className: "text-red-500 font-medium", children: activeStatus.SUSPENDED })) : (_jsx("span", { className: "text-yellow-500 font-medium", children: user.isApprovedStatus || "N/A" })) }), _jsx(TableCell, { children: _jsxs(Select, { defaultValue: user.isApprovedStatus, onValueChange: (value) => handleStatusChange(user._id, value), children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: activeStatus.APPROVED, children: activeStatus.APPROVED }), _jsx(SelectItem, { value: activeStatus.SUSPENDED, children: activeStatus.SUSPENDED })] })] }) })] }, user._id))) })] }) }), totalPages > 1 && (_jsx("div", { className: "flex justify-center items-center gap-2 mt-4", children: _jsx(Pagination, { children: _jsxs(PaginationContent, { children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { onClick: () => setCurrentPage((prev) => Math.max(prev - 1, 1)), className: currentPage === 1
                                        ? "pointer-events-none opacity-50"
                                        : "cursor-pointer" }) }), Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (_jsx(PaginationItem, { onClick: () => setCurrentPage(page), className: "cursor-pointer", children: _jsx(PaginationLink, { isActive: currentPage === page, children: page }) }, page))), _jsx(PaginationItem, { children: _jsx(PaginationNext, { onClick: () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)), className: currentPage === totalPages
                                        ? "pointer-events-none opacity-50"
                                        : "cursor-pointer" }) })] }) }) }))] }));
}
