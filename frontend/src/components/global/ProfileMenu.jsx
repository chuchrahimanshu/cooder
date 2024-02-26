// Import Section
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RESET, userSignOut } from "../../redux/auth/auth.slice";

// Import Utilities
import { FaSignOutAlt } from "react-icons/fa";

const ProfileMenu = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Form Handling Section
  const handleSignOut = async () => {
    const result = await dispatch(userSignOut());

    if (result.meta.requestStatus === "fulfilled") {
      await dispatch(RESET());
      navigate("/auth/sign-in");
    }
  };

  // JSX Component Return Section
  return (
    <div className="profile-menu">
      <section className="profile-menu__user" onClick={() => navigate("/")}>
        <img
          src={user?.avatar}
          className="profile-menu__user-image"
          alt="User Avatar"
        />
        <section>
          <h3 className="profile-menu__heading">{`${user.firstName} ${user.lastName}`}</h3>
          <p className="profile-menu__text">{`@${user.username}`}</p>
        </section>
      </section>
      <section className="profile-menu__links" onClick={handleSignOut}>
        <FaSignOutAlt className="profile-menu__links-icon" />
        <p className="profile-menu__links-text">Sign Out</p>
      </section>
    </div>
  );
};

export { ProfileMenu };
