// Import Section
import React from "react";
import {
  deleteFollower,
  deleteFollowing,
  getFollowers,
  getFollowing,
  userFollowDetails,
} from "../../redux/follow/followSlice";
import { useDispatch, useSelector } from "react-redux";

const FollowList = ({ list, heading, display, setDisplay }) => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // JSX Component Return Section
  return (
    <>
      {list && list?.length > 0 && (
        <div className="follow-list__container">
          <div className="follow-list">
            <section className="follow-list__header">
              <div className="follow-list__header-text">{heading}</div>
              <div
                className="follow-list__header-btn"
                onClick={() => setDisplay(!display)}>
                ❌
              </div>
            </section>
            <ul className="follow-list__body">
              {list &&
                list.map((element) => (
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
                    <button
                      className="follow-list__item-button"
                      onClick={async () => {
                        if (heading === "Followers") {
                          await dispatch(
                            deleteFollower({
                              userid: user._id,
                              followid: element._id,
                            })
                          );
                        } else {
                          await dispatch(
                            deleteFollowing({
                              userid: user._id,
                              followid: element._id,
                            })
                          );
                        }
                        await dispatch(userFollowDetails(user._id));
                        await dispatch(getFollowers(user._id));
                        await dispatch(getFollowing(user._id));
                      }}>
                      {heading === "Followers" ? "Remove" : "Unfollow"}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export { FollowList };
