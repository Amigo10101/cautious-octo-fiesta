import React from "react";
import Sidebar from "./sidebar";

function Layout({ children }) {
  return (
    <>
      <Sidebar inside={children} />
    </>
  );
}

export default Layout;
