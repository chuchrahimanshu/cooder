// Import Section
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptRequest,
  getFollowers,
  rejectRequest,
  userFollowRequests,
} from "../../redux/follow/followSlice";

// Import Utilities
import { Link } from "react-router-dom";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";

// JSX Component Function
const FollowRequests = () => {
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
      {followRequests && followRequests.length > 0 && (
        <section className="mbottom-2">
          <p className={`follow-display__heading ${theme}`}>
            Follow Requests 🚀
          </p>
          <ul className={`follow-display ${theme}`}>
            {followRequests.map((element) => (
              <div key={element._id} className="follow-display__container">
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
                        <p className="follow-display__list-user-name">
                          {`${element.firstName} ${element.lastName}`}
                        </p>
                      </section>
                    </section>
                  </Link>
                  <section className="follow-display__list-button-container">
                    <button
                      className="follow-display__list-button"
                      onClick={async () => {
                        await dispatch(
                          acceptRequest({
                            userid: user._id,
                            followid: element._id,
                          })
                        );
                        await dispatch(getFollowers(user._id));
                        await dispatch(userFollowRequests(user._id));
                      }}>
                      <RiUserFollowFill
                        className={`follow-display__list-button-icon ${theme}`}
                        id="follow-display__button-follow"
                      />
                    </button>
                    <button
                      className="follow-display__list-button"
                      onClick={async () => {
                        await dispatch(
                          rejectRequest({
                            userid: user._id,
                            followid: element._id,
                          })
                        );
                        await dispatch(userFollowRequests(user._id));
                      }}>
                      <RiUserUnfollowFill
                        className={`follow-display__list-button-icon ${theme}`}
                        id="follow-display__button-undo"
                      />
                    </button>
                  </section>
                </li>
              </div>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

// Export Section
export { FollowRequests };
