import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router";
const UnAuthorized = () => {
    return (_jsxs("div", { className: "flex justify-center items-center", children: [_jsx("h1", { children: " You are not Authorized User for This Page" }), _jsx(Link, { to: "/", children: "Home" })] }));
};
export default UnAuthorized;
