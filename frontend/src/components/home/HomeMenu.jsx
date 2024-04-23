// Import Section
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFollowers, getFollowing } from "../../redux/follow/followSlice";

// Import Utilities
import {
  FcHome,
  FcShop,
  FcConferenceCall,
  FcPlanner,
  FcReading,
  FcAndroidOs,
  FcNews,
} from "react-icons/fc";

// JSX Component Function
const HomeMenu = ({
  showFollowers,
  showFollowing,
  setShowFollowers,
  setShowFollowing,
}) => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.global);
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
    <div className={`home__menu ${theme}`}>
      <img
        src={user?.cover.url}
        alt="User Cover"
        className="home__menu-cover"
      />
      <img
        src={user?.avatar.url}
        alt="User Avatar"
        className={`home__menu-avatar ${theme}`}
      />
      <p
        className={`home__menu-text-primary ${theme}`}>{`${user?.firstName} ${user?.lastName}`}</p>
      <p className={`home__menu-text-secondary ${theme}`}>@{user?.username}</p>
      <section className="home__menu-follow">
        <section
          className={`home__menu-follow-section ${theme}`}
          onClick={() => setShowFollowers(!showFollowers)}>
          <span className="home__menu-follow-number">{followers?.length}</span>
          <span className="home__menu-follow-text">Followers</span>
        </section>
        <section
          className={`home__menu-follow-section ${theme}`}
          onClick={() => setShowFollowing(!showFollowing)}>
          <span className="home__menu-follow-number">{following?.length}</span>
          <span className="home__menu-follow-text">Following</span>
        </section>
      </section>
      <Link className={`home__menu-links ${theme}`} to="/">
        <FcHome className="home__menu-links--icon" />
        <p className="home__menu-links--text">Social Feed</p>
      </Link>
      <Link className={`home__menu-links ${theme}`} to="/coming-soon">
        <FcConferenceCall className="home__menu-links--icon" />
        <p className="home__menu-links--text">Community</p>
      </Link>
      <Link className={`home__menu-links ${theme}`} to="/coming-soon">
        <FcNews className="home__menu-links--icon" />
        <p className="home__menu-links--text">Snippets</p>
      </Link>
      <Link className={`home__menu-links ${theme}`} to="/coming-soon">
        <FcShop className="home__menu-links--icon" />
        <p className="home__menu-links--text">Marketplace</p>
      </Link>
      <Link className={`home__menu-links ${theme}`} to="/coming-soon">
        <FcAndroidOs className="home__menu-links--icon text-red" />
        <p className="home__menu-links--text">Bug Solver</p>
      </Link>
      <Link className={`home__menu-links ${theme}`} to="/coming-soon">
        <FcReading className="home__menu-links--icon" />
        <p className="home__menu-links--text">Learning</p>
      </Link>
      <Link className={`home__menu-links ${theme}`} to="/coming-soon">
        <FcPlanner className="home__menu-links--icon" />
        <p className="home__menu-links--text">Events</p>
      </Link>
      <p className={`home__menu-text ${theme}`}>
        Code crafted with ❤️ in India
      </p>
    </div>
  );
};

// Export Section
export { HomeMenu };
