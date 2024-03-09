// Import Section
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/user/user.slice";

const FollowDisplay = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

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
          {users.map((user) => (
            <li className="follow-display__list" key={user._id}>
              <section className="follow-display__list-user">
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="follow-display__list-user-avatar"
                />
                <section className="follow-display__list-user-details">
                  <p className="follow-display__list-user-username">
                    {user.username}
                  </p>
                  <p className="follow-display__list-user-name">{`${user.firstName} ${user.lastName}`}</p>
                </section>
              </section>
              <button
                className="follow-display__list-button"
                onClick={() => {}}>
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
