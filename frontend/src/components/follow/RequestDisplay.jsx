// Import Section
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptRequest,
  rejectRequest,
  getFollowers,
  userFollowRequests,
} from "../../redux/follow/followSlice";

// Import Utilities
import { ImCross } from "react-icons/im";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";

// JSX Component Function
const RequestDisplay = ({ showFollowRequests, setShowFollowRequests }) => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);
  const { followRequests } = useSelector((state) => state.follow);

  useEffect(() => {
    dispatch(userFollowRequests(user?._id));
  }, [user, dispatch]);

  // JSX Component Return Section
  return (
    <>
      {followRequests && followRequests?.length > 0 && (
        <div className="follow-list__container">
          <div className={`follow-list ${theme}`}>
            <section className={`follow-list__header ${theme}`}>
              <div className="follow-list__header-text">Requests 📬</div>
              <div
                className="follow-list__header-btn"
                onClick={async () => {
                  setShowFollowRequests(!showFollowRequests);
                }}>
                <ImCross className="follow-list__header-btn-icon" />
              </div>
            </section>
            <ul className="follow-list__body">
              {followRequests &&
                followRequests.map((element) => (
                  <li className="follow-list__item" key={element._id}>
                    <Link to={`/`} className="follow-list__item-link">
                      <section className="follow-list__item-section">
                        <img
                          src={element.avatar}
                          alt="User Avatar"
                          className="follow-list__item-avatar"
                        />
                        <section
                          className={`follow-list__item-content ${theme}`}>
                          <p className="follow-list__item-content-name">
                            {`${element.firstName} ${element.lastName}`}
                          </p>
                          <p className="follow-list__item-content-username">
                            @{element.username}
                          </p>
                        </section>
                      </section>
                    </Link>
                    <section className="follow-list__item-button-container">
                      <button
                        className={`follow-list__item-button ${theme}`}
                        id="follow-list__btn-green"
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
                        <RiUserFollowFill className="follow-list__item-button-icon" />
                      </button>
                      <button
                        className={`follow-list__item-button ${theme}`}
                        id="follow-list__btn-red"
                        onClick={async () => {
                          await dispatch(
                            rejectRequest({
                              userid: user._id,
                              followid: element._id,
                            })
                          );
                          await dispatch(userFollowRequests(user._id));
                        }}>
                        <RiUserUnfollowFill className="follow-list__item-button-icon" />
                      </button>
                    </section>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

// Export Section
export { RequestDisplay };
