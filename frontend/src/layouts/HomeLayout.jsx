import React from "react";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="home">
      <Outlet />
    </div>
  );
};

export { HomeLayout };
