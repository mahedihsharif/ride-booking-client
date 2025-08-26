import App from "@/App";
import { role } from "@/constants/role.constant";

import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generatorRoutes";
import { withAuth } from "@/utils/withAuth";
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { driverSidebarItems } from "./driverSidebarItems";
import { riderSidebarItems } from "./riderSidebarItems";

const HomePage = lazy(() => import("@/pages/HomePage"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Features = lazy(() => import("@/pages/Features"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Login = lazy(() => import("@/pages/Login"));
const UnAuthorized = lazy(() => import("@/pages/UnAuthorized"));
const Register = lazy(() => import("@/pages/Register"));

const RequestDetails = lazy(() => import("@/pages/rider/RequestRideDetails"));
const SingleRiderRideDetails = lazy(
  () => import("@/pages/rider/SingleRideDetails")
);
const SingleDriverRideDetails = lazy(
  () => import("@/pages/driver/SingleDriverRideDetails")
);
const DashboardLayout = lazy(
  () => import("@/components/layout/DashboardLayout")
);

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: Features,
        path: "features",
      },

      {
        Component: FAQ,
        path: "faq",
      },
      {
        Component: withAuth(RequestDetails),
        path: "ride-status/:id",
      },
      {
        Component: withAuth(SingleRiderRideDetails),
        path: "/rider/rides/:id",
      },
      {
        Component: withAuth(SingleDriverRideDetails),
        path: "/driver/rides/:id",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.ADMIN as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.RIDER as TRole),
    path: "/rider",
    children: [
      { index: true, element: <Navigate to="/rider/history" /> },
      ...generateRoutes(riderSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.DRIVER as TRole),
    path: "/driver",
    children: [
      { index: true, element: <Navigate to="/driver/earning/history" /> },
      ...generateRoutes(driverSidebarItems),
    ],
  },

  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },

  {
    Component: UnAuthorized,
    path: "/unauthorized",
  },
]);
