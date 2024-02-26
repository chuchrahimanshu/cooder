import React from "react";
import { Outlet } from "react-router-dom";
import { Header, HomeDisplay, HomeMenu } from "../components";

const HomeLayout = () => {
  return (
    <div className="home">
      <Header />
      <div className="home__sections body-format">
        <HomeMenu />
        <div className="home__sections-outlet">
          <Outlet />
        </div>
        <HomeDisplay />
      </div>
    </div>
  );
};

export { HomeLayout };
