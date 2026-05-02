import { activeUser } from "@/constants/admin.constant";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useAppSelector } from "@/redux/hook";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const user = useAppSelector((state) => state.auth.user);

    if (isLoading) {
      return null;
    }

    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/login" replace />;
    }

    if (user && user.isActive === activeUser.BLOCKED) {
      // blocked user → blocked page
      return <Navigate to="/user/blocked" replace />;
    }
    if (!isLoading && requiredRole && requiredRole !== data?.data?.role) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Component />;
  };
};
