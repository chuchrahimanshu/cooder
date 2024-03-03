// Import Section
import React from "react";
import { useSelector } from "react-redux";

const CreateComment = () => {
  // Hooks Configuration
  const { user } = useSelector((state) => state.auth);

  // JSX Component Return Section
  return (
    <div className="create-comment">
      <img
        src={user.avatar}
        alt="User Avatar"
        className="create-comment__user"
      />
      <form>
        <input type="text" className="create-comment__input" />
        <button type="submit" className="create-comment__button">
          Comment
        </button>
      </form>
    </div>
  );
};

// Export Section
export { CreateComment };
