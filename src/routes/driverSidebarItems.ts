import DriverHistory from "@/pages/driver/DriverHistory";
import EarningHistory from "@/pages/driver/EarningHistory";
import StatusUpdatePage from "@/pages/driver/StatusUpdatePage";
import ViewProfile from "@/pages/ViewProfile";
import type { ISidebarItem } from "@/types";
import { Clock, Truck, User, Wallet } from "lucide-react";

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
