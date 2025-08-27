import type { ISidebarItem } from "@/types";
import { Clock, Truck, User, Wallet } from "lucide-react";
import { lazy } from "react";
const ViewProfile = lazy(() => import("@/pages/ViewProfile"));
const DriverHistory = lazy(() => import("@/pages/driver/DriverHistory"));
const EarningHistory = lazy(() => import("@/pages/driver/EarningHistory"));
const StatusUpdatePage = lazy(() => import("@/pages/driver/StatusUpdatePage"));

export const driverSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
      {
        title: "Earning History",
        url: "/driver/earning/history",
        component: EarningHistory,
        icon: Wallet,
      },
      {
        title: "Rides History",
        url: "/driver/rides/history",
        component: DriverHistory,
        icon: Clock,
      },
      {
        title: "Ride Status",
        url: "/driver/ride-status/:id",
        component: StatusUpdatePage,
        icon: Truck,
      },
    ],
  },
  {
    title: "Profile Management",
    items: [
      {
        title: "Profile",
        url: "/driver/profile",
        component: ViewProfile,
        icon: User,
      },
    ],
  },
];
