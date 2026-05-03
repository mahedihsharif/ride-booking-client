import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import RideRequestHandler from "./components/modules/rides/RidesRequestHandler";
function App() {
    return (_jsx(_Fragment, { children: _jsxs(CommonLayout, { children: [_jsx(RideRequestHandler, {}), _jsx(Outlet, {})] }) }));
}
export default App;
