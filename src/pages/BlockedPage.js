import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
export default function BlockedPage({ statusMessage = "Your account is blocked or suspended.", contactEmail = "support@example.com", }) {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "flex flex-col items-center justify-center h-screen text-center p-4", children: [_jsx("h1", { className: "text-3xl font-bold text-red-600 mb-4", children: "Account Restricted" }), _jsx("p", { className: "mb-4", children: statusMessage }), _jsxs("p", { className: "mb-6", children: ["Please contact us at ", _jsx("strong", { children: contactEmail }), " to resolve this issue."] }), _jsx(Button, { onClick: () => navigate("/login"), children: "Go to Login" })] }));
}
