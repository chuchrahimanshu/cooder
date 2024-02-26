// Import Section
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Import Components
import { ProfileMenu, VerifyEmail } from "../index";

// Import Utilities
import Logo from "../../assets/images/logo/Logo.png";

const Header = () => {
  // Hooks Configuration
  const { user } = useSelector((state) => state.auth);

  // State Handling Section
  const [profileToggle, setProfileToggle] = useState(false);

  // JSX Component Return Section
  return (
    <div className="header">
      {!user?.isEmailVerified ? <VerifyEmail /> : null}
      <div className="header__container body-format">
        <section className="header__logo">
          <Link to="/">
            <img src={Logo} alt="Website Logo" className="header__logo-image" />
          </Link>
        </section>
        {user && (
          <section className="header__user">
            <img
              src={user?.avatar}
              className="header__user-image cursor-pointer"
              alt="User Avatar"
              onClick={() => setProfileToggle(!profileToggle)}
              height="60"
              width="60"
            />
            {profileToggle === true && <ProfileMenu />}
          </section>
        )}
      </div>
    </div>
  );
};

export { Header };
