/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEarningStateQuery } from "@/redux/features/auth/driver.api";

import { RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function EarningHistory() {
  // If your endpoint needs params (e.g. driverId), pass them in the hook
  const { data, isLoading, isFetching, refetch } =
    useEarningStateQuery(undefined);

  const stats = data?.data;

  const [range, setRange] = useState<"7d" | "30d">("7d");

  // Bar data from aggregates (Today / 7d / 30d)
  const barData = useMemo(
    () => [
      { label: "Today", value: stats?.daily ?? 0 },
      { label: "Last 7d", value: stats?.earningLast7Days ?? 0 },
      { label: "Last 30d", value: stats?.earningLast30Days ?? 0 },
    ],
    [stats]
  );

  // Line chart data if backend provides daily series; otherwise derive a simple placeholder
  const lineData = useMemo(() => {
    if (stats?.series?.length)
      return stats.series.map((s) => ({ ...s, name: s.date.slice(5) }));
    // fallback: fabricate a tiny series from aggregates so chart isn't empty
    const points = range === "7d" ? 7 : 30;
    const total =
      range === "7d"
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

  return (
    <div className="min-h-[calc(100vh-120px)] bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Earnings Dashboard
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="cursor-pointer"
            disabled={isFetching}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Earnings"
            value={formatBDT(stats?.totalEarning)}
            loading={isLoading}
          />
          <KPICard
            title="Completed Rides"
            value={stats?.totalCount ?? 0}
            loading={isLoading}
          />
          <KPICard
            title="Avg / Ride"
            value={formatBDT(stats?.avgEarning)}
            loading={isLoading}
          />
          <KPICard
            title="Today"
            value={formatBDT(stats?.daily)}
            loading={isLoading}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">Earnings by Period</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              {isLoading ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="label" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip formatter={(v: number) => formatBDT(v)} />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">
                Trend ({range === "7d" ? "Last 7 days" : "Last 30 days"})
              </CardTitle>
              <Tabs value={range} onValueChange={(v) => setRange(v as any)}>
                <TabsList>
                  <TabsTrigger value="7d">7d</TabsTrigger>
                  <TabsTrigger value="30d">30d</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="h-72">
              {isLoading ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip formatter={(v: number) => formatBDT(v)} />
                    <Line
                      type="monotone"
                      dataKey="earning"
                      dot={false}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">Today vs 30d</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              {isLoading ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                    >
                      {pieData.map((_, idx) => (
                        <Cell key={idx} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => formatBDT(v)} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function KPICard({
  title,
  value,
  loading,
}: {
  title: string;
  value: string | number;
  loading?: boolean;
}) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-28" />
        ) : (
          <div className="text-2xl font-semibold">{value}</div>
        )}
      </CardContent>
    </Card>
  );
}

function formatBDT(n?: number) {
  const v = typeof n === "number" ? n : 0;
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(v);
}
