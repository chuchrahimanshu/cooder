// Import Section
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Import Components
import { UserMenu, VerifyEmail } from "../index";

// Import Utilities
import Logo from "../../assets/images/logo/Logo.png";
import { FcTodoList } from "react-icons/fc";
import { IoNotifications } from "react-icons/io5";

const Header = ({ showFollowRequests, setShowFollowRequests }) => {
  // Hooks Configuration
  const { user } = useSelector((state) => state.auth);

  // State Handling Section
  const [userToggle, setUserToggle] = useState(false);

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
            <FcTodoList className="header__user-icons" title="TODO" />
            <IoNotifications
              className="header__user-icons text-red"
              id="header__noti"
            />
            <img
              src={user?.avatar}
              className="header__user-image cursor-pointer"
              alt="User Avatar"
              onClick={() => setUserToggle(!userToggle)}
              height="60"
              width="60"
            />
            <section className="header__user-menu">
              {userToggle === true && (
                <UserMenu
                  showFollowRequests={showFollowRequests}
                  setShowFollowRequests={setShowFollowRequests}
                />
              )}
            </section>
          </section>
        )}
      </div>
    </div>
  );
};

// Export Section
export { Header };
