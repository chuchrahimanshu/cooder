// Import Section
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Import Utilities
import {
  FcHome,
  FcShop,
  FcSettings,
  FcTodoList,
  FcPlanner,
  FcReading,
} from "react-icons/fc";
import { IoBug } from "react-icons/io5";
import { getFollowers, getFollowing } from "../../redux/follow/followSlice";

const HomeMenu = ({
  showFollowers,
  showFollowing,
  setShowFollowers,
  setShowFollowing,
}) => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { followers, following } = useSelector((state) => state.follow);

  useEffect(() => {
    if (user) {
      dispatch(getFollowers(user._id));
      dispatch(getFollowing(user._id));
    }
  }, [user, dispatch]);

  // JSX Component Return Section
  return (
    <div className="home__menu">
      <img src={user?.cover} alt="User Cover" className="home__menu-cover" />
      <img src={user?.avatar} alt="User Avatar" className="home__menu-avatar" />
      <p className="home__menu-text-primary">{`${user?.firstName} ${user?.lastName}`}</p>
      <p className="home__menu-text-secondary">@{user?.username}</p>
      <section className="home__menu-follow">
        <section
          className="home__menu-follow-section"
          onClick={() => setShowFollowers(!showFollowers)}>
          <span className="home__menu-follow-number">{followers?.length}</span>
          <span className="home__menu-follow-text">Followers</span>
        </section>
        <section
          className="home__menu-follow-section"
          onClick={() => setShowFollowing(!showFollowing)}>
          <span className="home__menu-follow-number">{following?.length}</span>
          <span className="home__menu-follow-text">Following</span>
        </section>
      </section>
      <Link className="home__menu-links">
        <FcHome className="home__menu-links--icon" />
        <p className="home__menu-links--text">Feed</p>
      </Link>
      <Link className="home__menu-links">
        <FcTodoList className="home__menu-links--icon" />
        <p className="home__menu-links--text">Todo List</p>
      </Link>
      <Link className="home__menu-links">
        <FcShop className="home__menu-links--icon" />
        <p className="home__menu-links--text">Marketplace</p>
      </Link>
      <Link className="home__menu-links">
        <IoBug className="home__menu-links--icon text-red" />
        <p className="home__menu-links--text">Bug Solver</p>
      </Link>
      <Link className="home__menu-links">
        <FcReading className="home__menu-links--icon" />
        <p className="home__menu-links--text">Learning</p>
      </Link>
      <Link className="home__menu-links">
        <FcPlanner className="home__menu-links--icon" />
        <p className="home__menu-links--text">Events</p>
      </Link>
      <Link className="home__menu-links">
        <FcSettings className="home__menu-links--icon" />
        <p className="home__menu-links--text">Settings</p>
      </Link>
    </div>
  );
};

// Export Section
export { HomeMenu };
