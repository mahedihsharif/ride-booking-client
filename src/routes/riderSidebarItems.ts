import Rider from "@/pages/rider/Rider";
import ViewProfile from "@/pages/ViewProfile";
import type { ISidebarItem } from "@/types";
import { Clock, User } from "lucide-react";

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
