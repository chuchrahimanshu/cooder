import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Header,
  HomeDisplay,
  HomeMenu,
  ListModal,
  RequestDisplay,
  ToggleTheme,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers, getFollowing } from "../redux/follow/followSlice";

const HomeLayout = () => {
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

  // State Handling Section
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowRequests, setShowFollowRequests] = useState(false);

  return (
    <>
      {showFollowers === true && followers && (
        <ListModal
          list={followers}
          heading="Followers"
          display={showFollowers}
          setDisplay={setShowFollowers}
        />
      )}
      {showFollowing === true && following && (
        <ListModal
          list={following}
          heading="Following"
          display={showFollowing}
          setDisplay={setShowFollowing}
        />
      )}
      {showFollowRequests === true && (
        <RequestDisplay
          showFollowRequests={showFollowRequests}
          setShowFollowRequests={setShowFollowRequests}
        />
      )}
      <div className={`home ${theme}`}>
        <section className="home__theme">
          <ToggleTheme />
        </section>
        <Header
          showFollowRequests={showFollowRequests}
          setShowFollowRequests={setShowFollowRequests}
        />
        <div className="home__sections body-format">
          <HomeMenu
            showFollowers={showFollowers}
            setShowFollowers={setShowFollowers}
            showFollowing={showFollowing}
            setShowFollowing={setShowFollowing}
          />
          <div className="home__sections-outlet">
            <Outlet />
          </div>
          <HomeDisplay />
        </div>
      </div>
    </>
  );
};

export { HomeLayout };
