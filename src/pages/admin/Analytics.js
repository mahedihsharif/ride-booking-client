import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDriverActivityQuery, useGetRevenueTrendsQuery, useGetRideVolumeQuery, } from "@/redux/features/analytics/analytics.api";
import { Loader2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";
export default function Analytics() {
    const { data: rideVolume, isLoading: rideLoading } = useGetRideVolumeQuery();
    const { data: revenueTrends, isLoading: revenueLoading } = useGetRevenueTrendsQuery();
    const { data: driverActivity, isLoading: driverLoading } = useGetDriverActivityQuery();
    if (rideLoading || revenueLoading || driverLoading) {
        return (_jsx("div", { className: "flex items-center justify-center h-[80vh]", children: _jsx(Loader2, { className: "animate-spin w-10 h-10 text-primary" }) }));
    }
    // Ride Volume Mapping
    const rideData = rideVolume?.data?.map((ride) => {
        const { year, month, day } = ride._id;
        const dateStr = day ? `${year}-${month}-${day}` : `${year}-${month}`;
        return {
            date: dateStr,
            totalRides: ride.totalRides,
        };
    });
    // Today's Total Rides
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const todaysRides = rideData?.find((r) => r.date === todayStr)?.totalRides ||
        0;
    // Revenue Trends Mapping
    const revenueData = revenueTrends?.data?.map((rev) => {
        const { year, month, day } = rev._id;
        const dateStr = day ? `${year}-${month}-${day}` : `${year}-${month}`;
        return {
            date: dateStr,
            totalRevenue: rev.totalRevenue,
        };
    });
    // Driver Activity Mapping
    const driverData = driverActivity?.data?.map((driver) => ({
        driverName: driver.name,
        ridesCompleted: driver.ridesCompleted,
    }));
    return (_jsxs("div", { className: "p-6 grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Ride Volume" }), _jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-300", children: ["Today\u2019s Total Rides: ", todaysRides] })] }), _jsx(CardContent, { className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: rideData || [], children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "date" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Bar, { dataKey: "totalRides", fill: "#3b82f6" })] }) }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Revenue Trends" }) }), _jsx(CardContent, { className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: revenueData || [], children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "date" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Line, { type: "monotone", dataKey: "totalRevenue", stroke: "#10b981" })] }) }) })] }), _jsxs(Card, { className: "md:col-span-3", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Driver Activity" }) }), _jsx(CardContent, { className: "h-[400px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: driverData || [], dataKey: "ridesCompleted", nameKey: "driverName", cx: "50%", cy: "50%", outerRadius: 150, label: true, children: driverData?.map((_, index) => (_jsx(Cell, { fill: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][index % 5] }, `cell-${index}`))) }), _jsx(Tooltip, {}), _jsx(Legend, {})] }) }) })] })] }));
}
