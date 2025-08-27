import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import RideRequestHandler from "./components/modules/rides/RidesRequestHandler";

function App() {
  return (
    <>
      <CommonLayout>
        <RideRequestHandler />
        <Outlet />
      </CommonLayout>
    </>
  );
}

export default App;
