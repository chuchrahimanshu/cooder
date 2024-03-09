// Import Section
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowers,
  getFollowing,
  updateFollowRelation,
  userFollowDetails,
} from "../../redux/follow/followSlice";

const FollowDisplay = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.follow);

  useEffect(() => {
    if (user) {
      dispatch(userFollowDetails(user._id));
    }
  }, [user, dispatch]);

  // JSX Component Return Section
  return (
    <>
      {users && users.length > 0 && (
        <ul className="follow-display">
          {users.map((element) => (
            <>
              {element.isFollowing === false && (
                <li className="follow-display__list" key={element._id}>
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
                        updateFollowRelation({
                          userid: user._id,
                          followid: element._id,
                        })
                      );
                      await dispatch(userFollowDetails(user._id));
                      await dispatch(getFollowers(user._id));
                      await dispatch(getFollowing(user._id));
                    }}>
                    Follow
                  </button>
                </li>
              )}
            </>
          ))}
        </ul>
      )}
    </>
  );
};

// Export Section
export { FollowDisplay };
