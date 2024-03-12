import React, { useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import {
  SHOW_FOLLOW_REQUESTS,
  getFollowRequests,
} from "../../redux/follow/followSlice";
import { useDispatch, useSelector } from "react-redux";

const FollowRequests = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { followRequests } = useSelector((state) => state.follow);

  useEffect(() => {
    if (user) {
      dispatch(getFollowRequests(user._id));
    }
  }, [user, dispatch]);

  return (
    <>
      {followRequests && followRequests?.length > 0 && (
        <section
          className="user-menu__links"
          onClick={async () => {
            await dispatch(SHOW_FOLLOW_REQUESTS());
          }}>
          <FaUsers className="user-menu__links-icon" />
          <p className="user-menu__links-text">
            Follow Requests {`(${followRequests?.length})`}
          </p>
        </section>
      )}
    </>
  );
};

export { FollowRequests };
