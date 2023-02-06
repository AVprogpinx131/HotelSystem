import React from "react";
import { Outlet } from "react-router-dom";
import FrontPageNavbar from "../Navbars/FrontPageNavbar";

function Layout() {
  return (
    <>
      <FrontPageNavbar />
      <Outlet />
    </>
  );
}

export default Layout;
