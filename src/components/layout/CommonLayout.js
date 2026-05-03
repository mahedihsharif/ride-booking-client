import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Footer from "./Footer";
import Navbar from "./Navbar";
const CommonLayout = ({ children }) => {
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [_jsx(Navbar, {}), _jsx("div", { className: "grow-1", children: children }), _jsx(Footer, {})] }));
};
export default CommonLayout;
