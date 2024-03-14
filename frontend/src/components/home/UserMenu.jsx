// Import Section
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RESET, userSignOut } from "../../redux/auth/auth.slice";

// Import Utilities
import { FaSignOutAlt } from "react-icons/fa";
import { FollowRequests } from "../follow/FollowRequests";

const UserMenu = () => {
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
    <div className="user-menu">
      <section
        className="user-menu__user"
        onClick={() => {
          const URL = `/profile/${user.username}`;
          navigate(URL);
        }}>
        <img
          src={user?.avatar}
          className="user-menu__user-image"
          alt="User Avatar"
        />
        <section>
          <h3 className="user-menu__heading">{`${user.firstName} ${user.lastName}`}</h3>
          <p className="user-menu__text">{`@${user.username}`}</p>
        </section>
      </section>
      <FollowRequests />
      <section
        className="user-menu__links"
        onClick={handleSignOut}
        id="sign-out">
        <FaSignOutAlt className="user-menu__links-icon" />
        <p className="user-menu__links-text">Sign Out</p>
      </section>
    </div>
  );
};

// Export Section
export { UserMenu };
