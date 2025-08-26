import ViewProfile from "@/pages/ViewProfile";
import type { ISidebarItem } from "@/types";
import { Truck, User } from "lucide-react";
import { lazy } from "react";
const RidersInfo = lazy(() => import("@/pages/admin/RidersInfo"));
const DriversInfo = lazy(() => import("@/pages/admin/DriversInfo"));
const RidesInfo = lazy(() => import("@/pages/admin/RidesInfo"));
const Analytics = lazy(() => import("@/pages/admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
        icon: Truck,
      },
      {
        title: "Rides Management",
        url: "/admin/rides",
        component: RidesInfo,
        icon: Truck,
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Riders",
        url: "/admin/riders",
        component: RidersInfo,
        icon: User,
      },
      {
        title: "Drivers",
        url: "/admin/drivers",
        component: DriversInfo,
        icon: User,
      },
    ],
  },
  {
    title: "Profile Management",
    items: [
      {
        title: "Profile",
        url: "/admin/profile",
        component: ViewProfile,
        icon: User,
      },
    ],
  },
];
