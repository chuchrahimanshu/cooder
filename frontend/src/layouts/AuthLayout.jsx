// Import Section
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToggleTheme } from "../components/global/ToggleTheme";

// JSX Component Section
const AuthLayout = () => {
  // Hooks Configuration
  const { theme } = useSelector((state) => state.global);

  return (
    <section className={`auth ${theme}`}>
      <div className="auth__outlet">
        <Outlet />
      </div>
      <div className="auth__theme">
        <ToggleTheme />
      </div>
    </section>
  );
};

// Export Section
export { AuthLayout };
