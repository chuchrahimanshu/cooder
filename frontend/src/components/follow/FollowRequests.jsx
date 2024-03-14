import React, { useEffect } from "react";
import {
  userFollowRequests,
  SHOW_FOLLOW_REQUESTS,
} from "../../redux/follow/followSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaUsers } from "react-icons/fa";

const FollowRequests = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { followRequests } = useSelector((state) => state.follow);

  useEffect(() => {
    if (user) {
      dispatch(userFollowRequests(user._id));
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
