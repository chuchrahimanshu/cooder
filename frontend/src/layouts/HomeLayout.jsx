import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components";

const HomeLayout = () => {
  return (
    <div className="home">
      <Header />
      <Outlet />
    </div>
  );
};

export { HomeLayout };
