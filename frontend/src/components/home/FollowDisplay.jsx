// Import Section
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/user/user.slice";
import { updateFollowRelation } from "../../redux/follow/followSlice";

const FollowDisplay = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!users) {
      dispatch(getAllUsers());
    }
  }, [users, dispatch]);

  // JSX Component Return Section
  return (
    <>
      {users && (
        <ul className="follow-display">
          {users.map((element) => (
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
                  <p className="follow-display__list-user-name">{`${element.firstName} ${element.lastName}`}</p>
                </section>
              </section>
              <button
                className="follow-display__list-button"
                onClick={() => {
                  dispatch(
                    updateFollowRelation({
                      userid: user._id,
                      followid: element._id,
                    })
                  );
                }}>
                Follow
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

// Export Section
export { FollowDisplay };
