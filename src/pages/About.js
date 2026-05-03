import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function AboutUs() {
    const team = [
        {
            name: "Sharif Ahmed",
            role: "Founder & CEO",
            image: "https://i.pravatar.cc/150?img=3",
        },
        {
            name: "Fatima Noor",
            role: "CTO",
            image: "https://i.pravatar.cc/150?img=5",
        },
        {
            name: "Hasan Ali",
            role: "Lead Designer",
            image: "https://i.pravatar.cc/150?img=8",
        },
        {
            name: "Sadia Karim",
            role: "Marketing Head",
            image: "https://i.pravatar.cc/150?img=10",
        },
    ];
    return (_jsx("section", { className: "py-16 px-6 lg:px-20 bg-white dark:bg-[#09090B] transition-colors duration-300", children: _jsxs("div", { className: "max-w-6xl mx-auto text-center", children: [_jsx("h2", { className: "text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6", children: "About Us" }), _jsx("p", { className: "text-lg text-gray-700 dark:text-gray-300 mb-12", children: "We are a modern ride-booking company committed to providing safe, affordable, and comfortable travel solutions. Our platform makes finding the right ride simple and reliable for everyone." }), _jsxs(Card, { className: "mb-16 bg-gray-50 dark:bg-gray-800 shadow-md border-none", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-2xl text-gray-900 dark:text-white", children: "Our Mission" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-gray-700 dark:text-gray-300 text-lg", children: "Our mission is to connect people with convenient and eco-friendly rides, empowering travelers with a smooth booking experience and professional service every step of the way." }) })] }), _jsx("h3", { className: "text-2xl font-semibold text-gray-900 dark:text-white mb-8", children: "Meet Our Team" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8", children: team.map((member, index) => (_jsx(Card, { className: "bg-gray-50 dark:bg-gray-800 shadow-lg border-none hover:shadow-xl transition", children: _jsxs(CardContent, { className: "flex flex-col items-center p-6", children: [_jsxs(Avatar, { className: "w-24 h-24 mb-4", children: [_jsx(AvatarImage, { src: member.image, alt: member.name }), _jsx(AvatarFallback, { children: member.name.charAt(0) })] }), _jsx("h4", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: member.name }), _jsx("p", { className: "text-gray-600 dark:text-gray-400", children: member.role })] }) }, index))) })] }) }));
}
