import type { ISidebarItem } from "@/types";
import { Clock, User } from "lucide-react";
import { lazy } from "react";
const ViewProfile = lazy(() => import("@/pages/ViewProfile"));

const Rider = lazy(() => import("@/pages/rider/Rider"));

export const riderSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
      {
        title: "Rides History",
        url: "/rider/history",
        component: Rider,
        icon: Clock,
      },
    ],
  },

  {
    title: "Profile Management",
    items: [
      {
        title: "Profile",
        url: "/rider/profile",
        component: ViewProfile,
        icon: User,
      },
    ],
  },
];
