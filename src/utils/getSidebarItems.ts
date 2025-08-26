import { role } from "@/constants/role.constant";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { driverSidebarItems } from "@/routes/driverSidebarItems";

import { riderSidebarItems } from "@/routes/riderSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.ADMIN:
      return [...adminSidebarItems];
    case role.RIDER:
      return [...riderSidebarItems];
    case role.DRIVER:
      return [...driverSidebarItems];
    default:
      return [];
  }
};
