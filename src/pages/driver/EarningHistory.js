import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEarningStateQuery } from "@/redux/features/auth/driver.api";
import { RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";
export default function EarningHistory() {
    // If your endpoint needs params (e.g. driverId), pass them in the hook
    const { data, isLoading, isFetching, refetch } = useEarningStateQuery(undefined);
    const stats = data?.data;
    const [range, setRange] = useState("7d");
    // Bar data from aggregates (Today / 7d / 30d)
    const barData = useMemo(() => [
        { label: "Today", value: stats?.daily ?? 0 },
        { label: "Last 7d", value: stats?.earningLast7Days ?? 0 },
        { label: "Last 30d", value: stats?.earningLast30Days ?? 0 },
    ], [stats]);
    // Line chart data if backend provides daily series; otherwise derive a simple placeholder
    const lineData = useMemo(() => {
        if (stats?.series?.length)
            return stats.series.map((s) => ({ ...s, name: s.date.slice(5) }));
        // fallback: fabricate a tiny series from aggregates so chart isn't empty
        const points = range === "7d" ? 7 : 30;
        const total = range === "7d"
            ? stats?.earningLast7Days ?? 0
            : stats?.earningLast30Days ?? 0;
        const avg = points ? total / points : 0;
        return Array.from({ length: points }, (_, i) => ({
            name: `${i + 1}`,
            earning: Math.max(0, avg),
        }));
    }, [stats, range]);
    // Small pie split Today vs Rest of month (just a fun view)
    const pieData = useMemo(() => {
        const today = stats?.daily ?? 0;
        const month = stats?.earningLast30Days ?? 0;
        const rest = Math.max(0, month - today);
        return [
            { name: "Today", value: today },
            { name: "Rest of 30d", value: rest },
        ];
    }, [stats]);
    return (_jsx("div", { className: "min-h-[calc(100vh-120px)] bg-background", children: _jsxs("div", { className: "container mx-auto px-4 py-8 max-w-6xl space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-2xl md:text-3xl font-bold text-foreground", children: "Earnings Dashboard" }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => refetch(), className: "cursor-pointer", disabled: isFetching, children: [_jsx(RefreshCw, { className: `mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}` }), "Refresh"] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(KPICard, { title: "Total Earnings", value: formatBDT(stats?.totalEarning), loading: isLoading }), _jsx(KPICard, { title: "Completed Rides", value: stats?.totalCount ?? 0, loading: isLoading }), _jsx(KPICard, { title: "Avg / Ride", value: formatBDT(stats?.avgEarning), loading: isLoading }), _jsx(KPICard, { title: "Today", value: formatBDT(stats?.daily), loading: isLoading })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [_jsxs(Card, { className: "rounded-2xl", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-base", children: "Earnings by Period" }) }), _jsx(CardContent, { className: "h-72", children: isLoading ? (_jsx(Skeleton, { className: "w-full h-full" })) : (_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: barData, children: [_jsx(CartesianGrid, { vertical: false, strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "label", tickLine: false, axisLine: false }), _jsx(YAxis, { tickLine: false, axisLine: false }), _jsx(Tooltip, { formatter: (v) => formatBDT(typeof v === 'number' ? v : undefined) }), _jsx(Bar, { dataKey: "value", radius: [10, 10, 0, 0] })] }) })) })] }), _jsxs(Card, { className: "rounded-2xl lg:col-span-2", children: [_jsxs(CardHeader, { className: "flex-row items-center justify-between", children: [_jsxs(CardTitle, { className: "text-base", children: ["Trend (", range === "7d" ? "Last 7 days" : "Last 30 days", ")"] }), _jsx(Tabs, { value: range, onValueChange: (v) => setRange(v), children: _jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "7d", children: "7d" }), _jsx(TabsTrigger, { value: "30d", children: "30d" })] }) })] }), _jsx(CardContent, { className: "h-72", children: isLoading ? (_jsx(Skeleton, { className: "w-full h-full" })) : (_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: lineData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "name", tickLine: false, axisLine: false }), _jsx(YAxis, { tickLine: false, axisLine: false }), _jsx(Tooltip, { formatter: (v) => formatBDT(typeof v === 'number' ? v : undefined) }), _jsx(Line, { type: "monotone", dataKey: "earning", dot: false, strokeWidth: 2 })] }) })) })] }), _jsxs(Card, { className: "rounded-2xl", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-base", children: "Today vs 30d" }) }), _jsx(CardContent, { className: "h-72", children: isLoading ? (_jsx(Skeleton, { className: "w-full h-full" })) : (_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: pieData, dataKey: "value", nameKey: "name", innerRadius: 50, outerRadius: 80, paddingAngle: 4, children: pieData.map((_, idx) => (_jsx(Cell, {}, idx))) }), _jsx(Tooltip, { formatter: (v) => formatBDT(typeof v === 'number' ? v : undefined) })] }) })) })] })] })] }) }));
}
function KPICard({ title, value, loading, }) {
    return (_jsxs(Card, { className: "rounded-2xl", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-sm text-muted-foreground", children: title }) }), _jsx(CardContent, { children: loading ? (_jsx(Skeleton, { className: "h-8 w-28" })) : (_jsx("div", { className: "text-2xl font-semibold", children: value })) })] }));
}
function formatBDT(n) {
    const v = typeof n === "number" ? n : 0;
    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(v);
}
