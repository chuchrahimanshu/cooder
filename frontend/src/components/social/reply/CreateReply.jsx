// Import Section
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createReply,
  getAllFollowingPosts,
} from "../../../redux/social/socialSlice";

// Import Utilities
import { IoSend } from "react-icons/io5";

// JSX Component Function
const CreateReply = ({ postid, commentid }) => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);

  // State Handling Section
  const [content, setContent] = useState("");

  // Form Handling Section
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!content) {
      return toast.error("Please add content to Reply");
    }

    const apiData = {
      paramsData: {
        userid: user?._id,
        postid: postid,
        commentid: commentid,
      },
      bodyData: {
        content: content,
      },
    };

    const result = await dispatch(createReply(apiData));
    if (result.meta.requestStatus === "fulfilled") {
      setContent("");
      await dispatch(getAllFollowingPosts(user._id));
    }
  };

  // JSX Component Return Section
  return (
    <div style={{ display: "flex" }} className="create-reply__container">
      <img
        src={user?.avatar.url}
        alt="User Avatar"
        className="create-reply__user"
      />
      <form className={`create-reply ${theme}`} onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className={`create-reply__input ${theme}`}
          placeholder="Unleash your creative comeback!"
        />
        <button type="submit" className="create-reply__button">
          <IoSend
            className={`create-reply__button-icon ${theme}`}
            title="Reply"
          />
        </button>
      </form>
    </div>
  );
};

// Export Section
export { CreateReply };
