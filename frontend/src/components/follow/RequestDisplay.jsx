import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptRequest,
  rejectRequest,
  getFollowers,
  userFollowRequests,
  SHOW_FOLLOW_REQUESTS,
} from "../../redux/follow/followSlice";

const RequestDisplay = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { followRequests } = useSelector((state) => state.follow);

  useEffect(() => {
    dispatch(userFollowRequests(user?._id));
  }, [user, dispatch]);

  return (
    <>
      {followRequests && followRequests?.length > 0 && (
        <div className="follow-list__container">
          <div className="follow-list">
            <section className="follow-list__header">
              <div className="follow-list__header-text">Follow Requests</div>
              <div
                className="follow-list__header-btn"
                onClick={async () => {
                  await dispatch(SHOW_FOLLOW_REQUESTS());
                }}>
                ❌
              </div>
            </section>
            <ul className="follow-list__body">
              {followRequests &&
                followRequests.map((element) => (
                  <li className="follow-list__item" key={element._id}>
                    <section className="follow-list__item-section">
                      <img
                        src={element.avatar}
                        alt="User Avatar"
                        className="follow-list__item-avatar"
                      />
                      <section className="follow-list__item-content">
                        <p className="follow-list__item-content-username">
                          {element.username}
                        </p>
                        <p className="follow-list__item-content-name">
                          {`${element.firstName} ${element.lastName}`}
                        </p>
                      </section>
                    </section>
                    <section>
                      <button
                        className="follow-list__item-button"
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
                        Accept
                      </button>
                      <button
                        className="follow-list__item-button"
                        onClick={async () => {
                          await dispatch(
                            rejectRequest({
                              userid: user._id,
                              followid: element._id,
                            })
                          );
                          await dispatch(userFollowRequests(user._id));
                        }}>
                        Reject
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

export { RequestDisplay };
