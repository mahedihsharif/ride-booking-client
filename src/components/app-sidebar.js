import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Logo from "@/assets/icons/Logo";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, } from "@/components/ui/sidebar";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { Link } from "react-router";
const AppSidebar = ({ ...props }) => {
    const { data: userData } = useUserInfoQuery(undefined);
    const data = {
        navMain: getSidebarItems(userData?.data?.role),
    };
    return (_jsxs(Sidebar, { ...props, children: [_jsx(SidebarHeader, { className: "items-center", children: _jsx(Link, { to: "/", children: _jsx(Logo, {}) }) }), _jsx(SidebarContent, { children: data.navMain.map((item) => (_jsxs(SidebarGroup, { children: [_jsx(SidebarGroupLabel, { children: item.title }), _jsx(SidebarGroupContent, { children: _jsx(SidebarMenu, { children: item.items.map((item) => (_jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { asChild: true, children: _jsxs(Link, { to: item.url, children: [item.icon && (_jsx(item.icon, { className: "w-5 h-5 text-gray-500" })), " ", _jsx("span", { children: item.title })] }) }) }, item.title))) }) })] }, item.title))) }), _jsx(SidebarRail, {})] }));
};
export default AppSidebar;
