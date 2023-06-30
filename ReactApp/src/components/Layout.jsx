import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import ContextProvider from "./ContextProvider";

const Layout = () => {
  return (
    <ContextProvider>
      <Header />
      <Outlet />
    </ContextProvider>
  );
};

export default Layout;
