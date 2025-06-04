import { Outlet } from "react-router-dom";
import TabButtons from "../TabButtons/TabButtons";

function Tab() {
  return (
    <>
      <div>
        <TabButtons />
      </div>
      <Outlet />
    </>
  );
}

export default Tab;
