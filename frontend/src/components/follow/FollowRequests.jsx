// Import Section
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFollowRequests } from "../../redux/follow/followSlice";

// Import Utilities
import { FaUsers } from "react-icons/fa";

// JSX Component Function
const FollowRequests = ({ showFollowRequests, setShowFollowRequests }) => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);
  const { followRequests } = useSelector((state) => state.follow);

  useEffect(() => {
    if (user) {
      dispatch(userFollowRequests(user._id));
    }
  }, [user, dispatch]);

  // JSX Component Return Section
  return (
    <>
      {followRequests && followRequests?.length > 0 && (
        <section
          className={`user-menu__links ${theme}`}
          onClick={async () => {
            setShowFollowRequests(!showFollowRequests);
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

// Export Section
export { FollowRequests };
