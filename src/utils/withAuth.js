import { jsx as _jsx } from "react/jsx-runtime";
import { activeUser } from "@/constants/admin.constant";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useAppSelector } from "@/redux/hook";
import { Navigate } from "react-router";
export const withAuth = (Component, requiredRole) => {
    return function AuthWrapper() {
        const { data, isLoading } = useUserInfoQuery(undefined);
        const user = useAppSelector((state) => state.auth.user);
        if (isLoading) {
            return null;
        }
        if (!isLoading && !data?.data?.email) {
            return _jsx(Navigate, { to: "/login", replace: true });
        }
        if (user && user.isActive === activeUser.BLOCKED) {
            // blocked user → blocked page
            return _jsx(Navigate, { to: "/user/blocked", replace: true });
        }
        if (!isLoading && requiredRole && requiredRole !== data?.data?.role) {
            return _jsx(Navigate, { to: "/unauthorized", replace: true });
        }
        return _jsx(Component, {});
    };
};
