import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
export default function Features() {
    const features = {
        Rider: [
            "Book rides instantly or schedule in advance",
            "Real-time ride tracking on the map",
            "Secure payment options (Cash / Card / Wallet)",
            "Ratings & Reviews for drivers",
            "Ride history & digital receipts",
        ],
        Driver: [
            "Accept or reject ride requests",
            "Navigation & optimized routes",
            "Earnings dashboard & daily reports",
            "Rating system to review riders",
            "Flexible online/offline availability",
        ],
        Admin: [
            "Manage riders & drivers from dashboard",
            "Real-time monitoring of rides",
            "Payment & commission management",
            "Analytics & performance reports",
            "Promo codes & discounts control",
        ],
    };
    return (_jsxs("section", { className: "container mx-auto py-20 px-6 bg-background dark:bg-background", children: [_jsxs("div", { className: "max-w-6xl mx-auto text-center mb-12", children: [_jsx("h2", { className: "text-4xl font-bold text-foreground dark:text-white", children: "Features" }), _jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "A complete solution tailored for Riders, Drivers, and Admins." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: Object.entries(features).map(([role, items]) => (_jsxs(Card, { className: "shadow-lg rounded-2xl border border-border bg-card text-card-foreground dark:bg-card dark:text-white", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-2xl font-semibold text-center", children: [role, " Features"] }) }), _jsx(CardContent, { children: _jsx("ul", { className: "space-y-3", children: items.map((item, index) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx(CheckCircle2, { className: "w-5 h-5 text-primary mt-1" }), _jsx("span", { className: "text-sm md:text-base", children: item })] }, index))) }) })] }, role))) })] }));
}
