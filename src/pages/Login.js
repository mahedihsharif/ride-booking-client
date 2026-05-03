import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Logo from "@/assets/icons/Logo";
import RideLogin from "@/assets/images/ride-login.jpg";
import { LoginForm } from "@/components/modules/auth/LoginForm";
import { Link } from "react-router";
const Login = () => {
    return (_jsxs("div", { className: "grid min-h-svh lg:grid-cols-2", children: [_jsxs("div", { className: "flex flex-col gap-4 p-6 md:p-10", children: [_jsx("div", { className: "flex justify-center gap-2 md:justify-start", children: _jsx(Link, { to: "/", className: "flex items-center gap-2 font-medium", children: _jsx(Logo, {}) }) }), _jsx("div", { className: "flex flex-1 items-center justify-center", children: _jsx("div", { className: "w-full max-w-xs", children: _jsx(LoginForm, {}) }) })] }), _jsx("div", { className: "relative hidden bg-muted lg:block", children: _jsx("img", { src: RideLogin, alt: "Image", className: "absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]" }) })] }));
};
export default Login;
