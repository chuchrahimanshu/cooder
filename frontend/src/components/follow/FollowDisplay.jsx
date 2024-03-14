// Import Section
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowers,
  getFollowing,
  createRequest,
  notFollowingUsers,
} from "../../redux/follow/followSlice";
import { getUserDetails } from "../../redux/auth/auth.slice";

const FollowDisplay = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.follow);

  useEffect(() => {
    if (user) {
      dispatch(notFollowingUsers(user._id));
    }
  }, [user, dispatch]);

  // JSX Component Return Section
  return (
    <>
      {users && users.length > 0 && (
        <ul className="follow-display">
          {users.map((element) => (
            <div key={element._id}>
              {element.isFollowing === false && (
                <li className="follow-display__list">
                  <section className="follow-display__list-user">
                    <img
                      src={element.avatar}
                      alt="User Avatar"
                      className="follow-display__list-user-avatar"
                    />
                    <section className="follow-display__list-user-details">
                      <p className="follow-display__list-user-username">
                        {element.username}
                      </p>
                      {element.isFollower === true ? (
                        <p className="follow-display__list-user-name">
                          Follow's You
                        </p>
                      ) : (
                        <p className="follow-display__list-user-name">
                          {`${element.firstName} ${element.lastName}`}
                        </p>
                      )}
                    </section>
                  </section>
                  <button
                    className="follow-display__list-button"
                    onClick={async () => {
                      await dispatch(
                        createRequest({
                          userid: user._id,
                          followid: element._id,
                        })
                      );
                      await dispatch(notFollowingUsers(user._id));
                      await dispatch(getFollowers(user._id));
                      await dispatch(getFollowing(user._id));
                      await dispatch(getUserDetails(user._id));
                    }}>
                    {user?.followRequested?.includes(element._id)
                      ? "Requested"
                      : "Follow"}
                  </button>
                </li>
              )}
            </div>
          ))}
        </ul>
      )}
    </>
  );
};

// Export Section
export { FollowDisplay };
