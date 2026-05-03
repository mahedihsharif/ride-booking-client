import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Logo from "@/assets/icons/Logo";
import RiderRegister from "@/assets/images/register.jpg";
import { RegisterForm } from "@/components/modules/auth/RegisterForm";
import { Link } from "react-router";
export default function Register() {
    return (_jsxs("div", { className: "grid min-h-svh lg:grid-cols-2", children: [_jsx("div", { className: "relative hidden bg-muted lg:block", children: _jsx("img", { src: RiderRegister, alt: "Image", className: "absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]" }) }), _jsxs("div", { className: "flex flex-col gap-4 p-6 md:p-10", children: [_jsx("div", { className: "flex justify-center gap-2 md:justify-start", children: _jsx(Link, { to: "/", className: "flex items-center gap-2 font-medium", children: _jsx(Logo, {}) }) }), _jsx("div", { className: "flex flex-1 items-center justify-center", children: _jsx("div", { className: "w-full max-w-xs", children: _jsx(RegisterForm, {}) }) })] })] }));
}
