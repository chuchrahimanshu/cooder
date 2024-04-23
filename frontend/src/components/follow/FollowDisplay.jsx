// Import Section
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getFollowers,
  getFollowing,
  createRequest,
  notFollowingUsers,
} from "../../redux/follow/followSlice";
import { getUserDetails } from "../../redux/auth/auth.slice";

// Import Utilities
import { TiArrowSyncOutline, TiUserAdd } from "react-icons/ti";

// JSX Component Function
const FollowDisplay = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.follow);

  const [followSuggestions, setFollowSuggestions] = useState(true);

  useEffect(() => {
    if (user) {
      dispatch(notFollowingUsers(user._id));
    }
    const suggestedUsers = users?.filter(
      (element) => element.isFollowing === false
    );
    if (suggestedUsers?.length <= 0) {
      setFollowSuggestions(false);
    }
  }, [user, dispatch]);

  // JSX Component Return Section
  return followSuggestions === false ? null : (
    <>
      <p className={`follow-display__heading ${theme}`}>
        Follow Suggestions ✨
      </p>
      {users && users.length > 0 && (
        <ul className={`follow-display ${theme}`}>
          {users.map((element) => (
            <div key={element._id} className="follow-display__container">
              {element.isFollowing === false && (
                <li className="follow-display__list">
                  <Link to={`/`} className="follow-display__list-link">
                    <section className={`follow-display__list-user ${theme}`}>
                      <img
                        src={element.avatar.url}
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
                        await dispatch(getUserDetails(user?._id));
                      }}>
                      {user?.followRequested?.includes(element._id) ? (
                        <TiArrowSyncOutline
                          className={`follow-display__list-button-icon ${theme}`}
                          id="follow-display__button-undo"
                          title="Undo"
                        />
                      ) : (
                        <TiUserAdd
                          className={`follow-display__list-button-icon ${theme}`}
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
