import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, } from "@/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { role } from "@/constants/role.constant";
import { authApi, useLogoutMutation, useUserInfoQuery, } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { logout as logoutAction } from "@/redux/reducer/authSlice";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Skeleton } from "../ui/skeleton";
import { ModeToggle } from "./ModeToogler";
// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
    { href: "/", label: "Home", role: "PUBLIC" },
    { href: "/about", label: "About", role: "PUBLIC" },
    { href: "/features", label: "Features", role: "PUBLIC" },
    { href: "/contact", label: "Contact", role: "PUBLIC" },
    { href: "/faq", label: "Faq", role: "PUBLIC" },
    { href: "/rider", label: "Dashboard", role: role.RIDER },
    { href: "/driver", label: "Dashboard", role: role.DRIVER },
    { href: "/admin", label: "Dashboard", role: role.ADMIN },
];
const Navbar = () => {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const [scrolled, setScrolled] = useState(false);
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const handleLogout = async () => {
        await logout(undefined);
        localStorage.removeItem("accessToken");
        dispatch(logoutAction());
        dispatch(authApi.util.resetApiState());
    };
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (_jsx("header", { className: `sticky top-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-background/80 backdrop-blur-md shadow-lg border-b border-border"
            : "bg-background border-b border-border"}`, children: _jsxs("div", { className: "container mx-auto px-4 flex h-16 items-center justify-between gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { className: "group size-8 md:hidden", variant: "ghost", size: "icon", children: _jsxs("svg", { className: "pointer-events-none", width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("path", { d: "M4 12L20 12", className: "origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]" }), _jsx("path", { d: "M4 12H20", className: "origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45" }), _jsx("path", { d: "M4 12H20", className: "origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]" })] }) }) }), _jsx(PopoverContent, { align: "start", className: "w-36 p-1 md:hidden", children: _jsx(NavigationMenu, { className: "max-w-none *:w-full", children: _jsx(NavigationMenuList, { className: "flex-col items-start gap-0 md:gap-2", children: !isLoading &&
                                                navigationLinks.map((link, index) => (_jsxs(React.Fragment, { children: [link.role === "PUBLIC" &&
                                                            !(data?.data?.role === role.ADMIN &&
                                                                (link.label === "Contact" || link.label === "Faq")) && (_jsx(NavigationMenuItem, { children: _jsx(NavigationMenuLink, { asChild: true, className: "text-foreground hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-md font-bold transition-all", children: _jsx(Link, { to: link.href, children: link.label }) }) })), link.role === data?.data?.role && (_jsx(NavigationMenuItem, { children: _jsx(NavigationMenuLink, { asChild: true, className: "text-foreground hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-md font-bold transition-all", children: _jsx(Link, { to: link.href, children: link.label }) }) }))] }, index))) }) }) })] }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsx(Link, { to: "/", className: "text-primary hover:text-primary/90", children: _jsx(Logo, {}) }), _jsx(NavigationMenu, { className: "max-md:hidden", children: _jsx(NavigationMenuList, { className: "gap-2", children: !isLoading &&
                                            navigationLinks.map((link, index) => (_jsxs(React.Fragment, { children: [link.role === "PUBLIC" &&
                                                        !(data?.data?.role === role.ADMIN &&
                                                            (link.label === "Contact" || link.label === "Faq")) && (_jsx(NavigationMenuItem, { children: _jsx(NavigationMenuLink, { asChild: true, className: "text-foreground hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-md font-bold transition-all", children: _jsx(Link, { to: link.href, children: link.label }) }) })), link.role === data?.data?.role && (_jsx(NavigationMenuItem, { children: _jsx(NavigationMenuLink, { asChild: true, className: "text-foreground hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-md font-bold transition-all", children: _jsx(Link, { to: link.href, children: link.label }) }) }))] }, index))) }) })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(ModeToggle, {}), isLoading ? (_jsx(Skeleton, { className: "h-9 w-20 rounded-md" })) : data?.data?.email ? (_jsx(Button, { onClick: handleLogout, variant: "outline", className: "text-sm cursor-pointer border-primary text-foreground hover:bg-primary/10 font-bold", children: "Logout" })) : (_jsx(Button, { asChild: true, className: "text-sm bg-primary hover:bg-primary/90 text-primary-foreground font-bold", children: _jsx(Link, { to: "/login", children: "Login" }) }))] })] }) }));
};
export default Navbar;
