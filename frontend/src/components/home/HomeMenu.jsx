import React from "react";
import { useSelector } from "react-redux";

const HomeMenu = () => {
  // Hooks Configuration
  const { user } = useSelector((state) => state.auth);

  // JSX Component Return Section
  return (
    <div className="home__menu">
      <img src={user?.cover} alt="User Cover" className="home__menu-cover" />
      <img src={user?.avatar} alt="User Avatar" className="home__menu-avatar" />
    </div>
  );
};

export { HomeMenu };
