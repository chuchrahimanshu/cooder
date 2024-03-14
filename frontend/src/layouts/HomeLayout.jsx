import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Header,
  HomeDisplay,
  HomeMenu,
  ListModal,
  RequestDisplay,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowers,
  getFollowing,
  SHOW_FOLLOW_REQUESTS,
} from "../redux/follow/followSlice";

const HomeLayout = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { followers, following, showFollowRequests } = useSelector(
    (state) => state.follow
  );

  useEffect(() => {
    if (user) {
      dispatch(getFollowers(user._id));
      dispatch(getFollowing(user._id));
      dispatch(SHOW_FOLLOW_REQUESTS());
    }
  }, [user, dispatch]);

  // State Handling Section
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

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
      {showFollowRequests === true && <RequestDisplay />}
      <div className="home">
        <Header />
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
