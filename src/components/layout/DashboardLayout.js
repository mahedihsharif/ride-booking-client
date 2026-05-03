import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import AppSidebar from "../app-sidebar";
const DashboardLayout = () => {
    return (_jsxs(SidebarProvider, { children: [_jsx(AppSidebar, {}), _jsxs(SidebarInset, { children: [_jsxs("header", { className: "flex h-16 shrink-0 items-center gap-2 border-b px-4", children: [_jsx(SidebarTrigger, { className: "-ml-1" }), _jsx(Separator, { orientation: "vertical", className: "mr-2 data-[orientation=vertical]:h-4" })] }), _jsx("div", { className: "flex flex-1 flex-col gap-4 p-4", children: _jsx(Outlet, {}) })] })] }));
};
export default DashboardLayout;
