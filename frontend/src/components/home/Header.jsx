// Import Section
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Import Components
import { UserMenu, VerifyEmail } from "../index";

// Import Utilities
import Logo from "../../assets/images/logo/Logo.png";

// JSX Component Function
const Header = () => {
  // Hooks Configuration
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);

  // State Handling Section
  const [userToggle, setUserToggle] = useState(false);

  // JSX Component Return Section
  return (
    <div className={`header ${theme}`}>
      {!user?.isEmailVerified ? <VerifyEmail /> : null}
      <div className={`header__container body-format ${theme}`}>
        <section className="header__logo">
          <Link to="/">
            <img src={Logo} alt="Website Logo" className="header__logo-image" />
          </Link>
        </section>
        {user && (
          <section className="header__user">
            <img
              src={user?.avatar.url}
              className="header__user-image cursor-pointer"
              alt="User Avatar"
              onClick={() => setUserToggle(!userToggle)}
              height="60"
              width="60"
            />
            {userToggle === true && <UserMenu />}
          </section>
        )}
      </div>
    </div>
  );
};

// Export Section
export { Header };
