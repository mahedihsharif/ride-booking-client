/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetDriverActivityQuery,
  useGetRevenueTrendsQuery,
  useGetRideVolumeQuery,
} from "@/redux/features/analytics/analytics.api";
import { Loader2 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Analytics() {
  const { data: rideVolume, isLoading: rideLoading } = useGetRideVolumeQuery();
  const { data: revenueTrends, isLoading: revenueLoading } =
    useGetRevenueTrendsQuery();
  const { data: driverActivity, isLoading: driverLoading } =
    useGetDriverActivityQuery();

  if (rideLoading || revenueLoading || driverLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
      </div>
    );
  }

  // Ride Volume Mapping
  const rideData = rideVolume?.data?.map((ride: any) => {
    const { year, month, day } = ride._id;
    const dateStr = day ? `${year}-${month}-${day}` : `${year}-${month}`;
    return {
      date: dateStr,
      totalRides: ride.totalRides,
    };
  });

  // Today's Total Rides
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const todaysRides =
    rideData?.find((r: { date: string }) => r.date === todayStr)?.totalRides ||
    0;

  // Revenue Trends Mapping
  const revenueData = revenueTrends?.data?.map((rev: any) => {
    const { year, month, day } = rev._id;
    const dateStr = day ? `${year}-${month}-${day}` : `${year}-${month}`;
    return {
      date: dateStr,
      totalRevenue: rev.totalRevenue,
    };
  });

  // Driver Activity Mapping
  const driverData = driverActivity?.data?.map((driver: any) => ({
    driverName: driver.name,
    ridesCompleted: driver.ridesCompleted,
  }));

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Ride Volume */}
      <Card>
        <CardHeader>
          <CardTitle>Ride Volume</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Today’s Total Rides: {todaysRides}
          </p>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rideData || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalRides" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalRevenue" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Driver Activity */}
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Driver Activity</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={driverData || []}
                dataKey="ridesCompleted"
                nameKey="driverName"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label
              >
                {driverData?.map((_: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][
                        index % 5
                      ]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
