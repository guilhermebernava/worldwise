import { Outlet } from "react-router-dom";
import TabButtons from "../TabButtons/TabButtons";
import { memo } from "react";

const Tab = memo(function Tab() {
  return (
    <>
      <div>
        <TabButtons />
      </div>
      <Outlet />
    </>
  );
});

export default Tab;
