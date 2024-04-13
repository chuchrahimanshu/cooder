// Import Section
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RESET, userSignOut } from "../../redux/auth/auth.slice";

// Import Utilities
import { FaPowerOff, FaUser } from "react-icons/fa";

// JSX Component Function
const UserMenu = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.global);
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
    <div className={`user-menu ${theme}`}>
      <section className={`user-menu__section ${theme}`}>
        <FaUser className="user-menu__icon" />
        <p
          className="user-menu__text"
          onClick={() => navigate(`/profile/${user?.username}`)}>
          Profile
        </p>
      </section>
      <section
        className={`user-menu__section ${theme}`}
        onClick={handleSignOut}>
        <FaPowerOff className="user-menu__icon" />
        <p className="user-menu__text">Sign Out</p>
      </section>
    </div>
  );
};

// Export Section
export { UserMenu };
