// Import Section
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getFollowers,
  getFollowing,
  createRequest,
  notFollowingUsers,
} from "../../redux/follow/followSlice";
import { getUserDetails } from "../../redux/auth/auth.slice";
import {
  TiArrowLoopOutline,
  TiArrowRepeatOutline,
  TiArrowSyncOutline,
  TiBackspace,
  TiThumbsUp,
  TiUserAdd,
} from "react-icons/ti";

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
      <p className="follow-display__heading">Follow Suggestions ✨</p>
      {users && users.length > 0 && (
        <ul className="follow-display">
          {users.map((element) => (
            <div key={element._id} className="follow-display__container">
              {element.isFollowing === false && (
                <li className="follow-display__list">
                  <Link
                    to={`/profile/${element.username}`}
                    className="follow-display__list-link">
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
                  </Link>
                  <section className="follow-display__list-button-container">
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
                      {user?.followRequested?.includes(element._id) ? (
                        <TiArrowSyncOutline
                          className="follow-display__list-button-icon"
                          id="follow-display__button-undo"
                          title="Undo"
                        />
                      ) : (
                        <TiUserAdd
                          className="follow-display__list-button-icon"
                          id="follow-display__button-follow"
                          title="Follow"
                        />
                      )}
                    </button>
                  </section>
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
