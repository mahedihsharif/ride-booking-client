import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { activeUser } from "@/constants/admin.constant";
import { globalErrorResponse } from "@/helpers/globalErrorHandler";
import { useRidersActiveStatusMutation, useRidersInfoQuery, } from "@/redux/features/admin/admin.api";
import { useState } from "react";
import { toast } from "sonner";
export default function RidersInfo() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const { data: usersData, isLoading, error } = useRidersInfoQuery({
        page: currentPage,
        limit,
        search: searchTerm || undefined,
        status: statusFilter || undefined,
    });
    const [ridersActiveStatus] = useRidersActiveStatusMutation();
    if (isLoading) {
        return (_jsx("div", { className: "p-4", children: "Loading riders..." }));
    }
    if (error) {
        return (_jsxs("div", { className: "p-4 text-red-500", children: ["Error loading riders: ", globalErrorResponse(error)?.data?.message || "Unknown error"] }));
    }
    const totalItems = usersData?.data?.meta?.total || 0;
    const totalPages = Math.ceil(totalItems / limit);
    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-start items-center mb-6 gap-4", children: [_jsxs("form", { onSubmit: handleSearch, className: "flex gap-2", children: [_jsx("input", { type: "text", placeholder: "Search by name, email or phone...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "border rounded px-3 py-2 dark:bg-gray-800 dark:text-white" }), _jsx("button", { type: "submit", className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "Search" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "statusFilter", className: "font-medium mr-2", children: "Status:" }), _jsxs("select", { id: "statusFilter", value: statusFilter, onChange: (e) => {
                                    setStatusFilter(e.target.value);
                                    setCurrentPage(1);
                                }, className: "border rounded px-2 py-1 dark:bg-gray-800 dark:text-white", children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: activeUser.ACTIVE, children: activeUser.ACTIVE }), _jsx("option", { value: activeUser.BLOCKED, children: activeUser.BLOCKED })] })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { className: "min-w-full", children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "bg-gray-100 dark:bg-gray-800", children: [_jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "Email" }), _jsx(TableHead, { children: "Phone" }), _jsx(TableHead, { children: "Role" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Action" })] }) }), _jsx(TableBody, { children: (Array.isArray(usersData?.data)
                                ? usersData?.data
                                : usersData?.data?.riders ||
                                    usersData?.data?.data ||
                                    []).map((user, index) => (_jsxs(TableRow, { className: index % 2 === 0
                                    ? "bg-gray-50 dark:bg-gray-900"
                                    : "bg-white dark:bg-gray-800", children: [_jsx(TableCell, { children: user.name }), _jsx(TableCell, { children: user.email }), _jsx(TableCell, { children: user.phone }), _jsx(TableCell, { children: user.role }), _jsx(TableCell, { children: user.isActive === activeUser.ACTIVE ? (_jsx("span", { className: "text-green-500 font-medium", children: activeUser.ACTIVE })) : (_jsx("span", { className: "text-red-500 font-medium", children: activeUser.BLOCKED })) }), _jsx(TableCell, { children: _jsxs(Select, { defaultValue: user.isActive, onValueChange: async (value) => {
                                                try {
                                                    const res = await ridersActiveStatus({
                                                        id: user._id,
                                                        status: { isActive: value },
                                                    }).unwrap();
                                                    if (res.success) {
                                                        if (value === activeUser.BLOCKED) {
                                                            toast.error(res.message);
                                                        }
                                                        else {
                                                            toast.success(res.message);
                                                        }
                                                    }
                                                }
                                                catch (error) {
                                                    if (error) {
                                                        const errorMsg = globalErrorResponse(error);
                                                        toast.error(errorMsg?.data?.message);
                                                    }
                                                }
                                            }, children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: activeUser.ACTIVE, children: activeUser.ACTIVE }), _jsx(SelectItem, { value: activeUser.BLOCKED, children: activeUser.BLOCKED })] })] }) })] }, user._id))) })] }) }), totalPages > 1 && (_jsx("div", { className: "flex justify-center items-center gap-2 mt-4", children: _jsx(Pagination, { children: _jsxs(PaginationContent, { children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { onClick: () => setCurrentPage((prev) => Math.max(prev - 1, 1)), className: currentPage === 1
                                        ? "pointer-events-none opacity-50"
                                        : "cursor-pointer" }) }), Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (_jsx(PaginationItem, { onClick: () => setCurrentPage(page), className: "cursor-pointer", children: _jsx(PaginationLink, { isActive: currentPage === page, children: page }) }, page))), _jsx(PaginationItem, { children: _jsx(PaginationNext, { onClick: () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)), className: currentPage === totalPages
                                        ? "pointer-events-none opacity-50"
                                        : "cursor-pointer" }) })] }) }) }))] }));
}
