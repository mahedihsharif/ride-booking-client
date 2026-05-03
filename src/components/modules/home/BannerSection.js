import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { role } from "@/constants/role.constant";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { motion } from "framer-motion";
import { AddRideModal } from "../rides/AddRideModal";
export default function BannerSection() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    if (isLoading) {
        return _jsx("div", { children: "Loading...." });
    }
    const userRole = data?.data?.role;
    // Role-based content configuration
    const content = {
        [role.RIDER]: {
            title: (_jsxs(_Fragment, { children: ["Your Premium ", _jsx("span", { className: "text-primary", children: "Ride" }), " ", _jsx("br", {}), "Anywhere, Anytime."] })),
            description: "Experience the next level of comfort and safety with our elite fleet. Book instantly and reach your destination with ease.",
            image: "/banner-rider.png",
        },
        [role.DRIVER]: {
            title: (_jsxs(_Fragment, { children: ["Drive More, ", _jsx("span", { className: "text-primary", children: "Earn" }), " More ", _jsx("br", {}), "in Dhaka City."] })),
            description: "Join our network of professional drivers. Set your own schedule, be your own boss, and maximize your daily earnings.",
            image: "/banner-driver.png",
        },
        [role.ADMIN]: {
            title: (_jsxs(_Fragment, { children: ["Scale Your ", _jsx("span", { className: "text-primary", children: "Ride" }), " ", _jsx("br", {}), "Booking Operations."] })),
            description: "Monitor real-time data, manage users efficiently, and oversee the entire Dhaka city network from one powerful dashboard.",
            image: "/banner-admin.png",
        },
        GUEST: {
            title: (_jsxs(_Fragment, { children: ["Your Premium ", _jsx("span", { className: "text-primary", children: "Ride" }), " ", _jsx("br", {}), "Anywhere, Anytime."] })),
            description: "Experience the next level of comfort and safety with our elite fleet. Book instantly and reach your destination with ease.",
            image: "/banner-rider.png",
        }
    };
    const activeContent = userRole ? content[userRole] : content.GUEST;
    return (_jsxs("section", { className: "relative min-h-[85vh] flex items-center justify-center bg-background overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-1000", style: {
                    backgroundImage: `url('${activeContent.image}')`,
                    filter: "brightness(0.7)",
                } }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent opacity-90 dark:opacity-80" }), _jsx(motion.div, { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8, ease: "easeOut" }, className: "relative z-10 w-full max-w-7xl px-8 flex flex-col items-start justify-center", children: _jsxs("div", { className: "max-w-2xl text-left", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, children: [_jsx("h1", { className: "text-4xl md:text-7xl font-extrabold mb-6 text-foreground leading-tight drop-shadow-sm", children: activeContent.title }), _jsx("p", { className: "text-lg md:text-xl text-foreground/80 dark:text-muted-foreground mb-10 max-w-lg leading-relaxed font-medium", children: activeContent.description })] }), _jsxs("div", { className: "flex gap-6 items-center flex-wrap", children: [userRole === role.DRIVER && (_jsx(Button, { size: "lg", className: "rounded-2xl shadow-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-16 px-10 text-xl transition-all transform hover:scale-105 active:scale-95", onClick: () => (window.location.href = "/driver/profile"), children: "Go Online Now" })), (userRole === role.RIDER || !userRole) && (_jsx(AddRideModal, { context: "Book Your Ride Now \u2192", size: "lg", className: "rounded-2xl shadow-[0_10px_40px_rgba(255,184,108,0.3)] bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-16 px-10 text-xl transition-all transform hover:scale-105 active:scale-95 border-none" })), userRole === role.ADMIN && (_jsx(Button, { size: "lg", className: "rounded-2xl shadow-2xl bg-[#50fa7b] hover:bg-[#40c962] text-primary-foreground font-bold h-16 px-10 text-xl transition-all transform hover:scale-105", onClick: () => (window.location.href = "/admin"), children: "Go to Dashboard" })), _jsx(Button, { variant: "outline", size: "lg", className: "rounded-2xl border-border text-foreground hover:bg-muted h-16 px-8 text-lg font-medium backdrop-blur-sm", onClick: () => (window.location.href = "/about"), children: "Learn More" })] })] }) }, userRole || 'guest')] }));
}
