import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { role } from "@/constants/role.constant";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { motion } from "framer-motion";
export default function PromotionsSection() {
    const { data } = useUserInfoQuery(undefined);
    const userRole = data?.data?.role;
    // 🎁 Rider offers
    const riderOffers = [
        {
            title: "Summer Discount",
            description: "Get 20% off on all rides booked this summer.",
            bgColor: "bg-[#f1fa8c]/20 dark:bg-[#f1fa8c]/10",
        },
        {
            title: "Student Offer",
            description: "Students get 15% off on every ride with student ID.",
            bgColor: "bg-[#50fa7b]/20 dark:bg-[#50fa7b]/10",
        },
        {
            title: "First Ride Free",
            description: "New users enjoy their first ride absolutely free!",
            bgColor: "bg-[#8be9fd]/20 dark:bg-[#8be9fd]/10",
        },
    ];
    // 🚖 Driver offers
    const driverOffers = [
        {
            title: "Weekly Bonus",
            description: "Earn up to $100 extra every week with consistent rides.",
            bgColor: "bg-[#bd93f9]/20 dark:bg-[#bd93f9]/10",
        },
        {
            title: "Referral Reward",
            description: "Refer a driver and earn $50 bonus instantly.",
            bgColor: "bg-[#ff79c6]/20 dark:bg-[#ff79c6]/10",
        },
        {
            title: "Fuel Discount",
            description: "Exclusive 10% off on partner fuel stations.",
            bgColor: "bg-[#ffb86c]/20 dark:bg-[#ffb86c]/10",
        },
    ];
    // 👑 Admin offers (more like perks)
    const adminOffers = [
        {
            title: "Analytics Access",
            description: "Get real-time analytics and usage insights for free.",
            bgColor: "bg-[#ff5555]/20 dark:bg-[#ff5555]/10",
        },
        {
            title: "Priority Support",
            description: "24/7 dedicated admin support at no extra cost.",
            bgColor: "bg-[#bd93f9]/20 dark:bg-[#bd93f9]/10",
        },
        {
            title: "Team Management",
            description: "Add unlimited team members with no additional fee.",
            bgColor: "bg-[#8be9fd]/20 dark:bg-[#8be9fd]/10",
        },
    ];
    // Default (guest / no role)
    const guestOffers = [
        {
            title: "Welcome Gift",
            description: "Sign up today and get $5 credit instantly.",
            bgColor: "bg-[#50fa7b]/20 dark:bg-[#50fa7b]/10",
        },
        {
            title: "First Ride Free",
            description: "Enjoy your first ride absolutely free on us!",
            bgColor: "bg-[#8be9fd]/20 dark:bg-[#8be9fd]/10",
        },
        {
            title: "Early Access",
            description: "Be the first to try our new features and updates.",
            bgColor: "bg-[#f1fa8c]/20 dark:bg-[#f1fa8c]/10",
        },
    ];
    // Role-based selection
    let offers = guestOffers;
    if (userRole === role.RIDER)
        offers = riderOffers;
    else if (userRole === role.DRIVER)
        offers = driverOffers;
    else if (userRole === role.ADMIN)
        offers = adminOffers;
    return (_jsx("section", { className: "py-20 bg-background", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 text-center", children: [_jsx("h2", { className: "text-3xl md:text-5xl font-bold mb-4 text-foreground", children: "Special Offers" }), _jsxs("p", { className: "text-lg md:text-xl mb-12 text-muted-foreground", children: [userRole === role.RIDER &&
                            "Exclusive discounts and deals for our riders.", userRole === role.DRIVER &&
                            "Boost your earnings with our driver special offers.", userRole === role.ADMIN &&
                            "Enjoy perks and management features as an admin.", !userRole &&
                            "Check out our latest offers and save big on your rides!"] }), _jsx("div", { className: "grid md:grid-cols-3 gap-8", children: offers.map((offer, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: index * 0.2 }, children: _jsx(Card, { className: `rounded-2xl shadow-lg border-border ${offer.bgColor}`, children: _jsxs(CardContent, { className: "flex flex-col items-center text-center gap-4 p-6", children: [_jsx(CardTitle, { className: "text-xl font-semibold text-foreground", children: offer.title }), _jsx("p", { className: "text-muted-foreground", children: offer.description })] }) }) }, index))) })] }) }));
}
