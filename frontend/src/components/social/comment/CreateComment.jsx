// Import Section
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createComment,
  getAllFollowingPosts,
} from "../../../redux/social/socialSlice";
import { IoSend } from "react-icons/io5";

const CreateComment = ({ postid }) => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // State Handling Section
  const [content, setContent] = useState("");

  // Form Handling Section
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(content);

    if (!content) {
      return toast.error("Please add content to Comment");
    }

    const apiData = {
      paramsData: {
        postid: postid,
        userid: user?._id,
      },
      bodyData: {
        content: content,
      },
    };

    const result = await dispatch(createComment(apiData));
    if (result.meta.requestStatus === "fulfilled") {
      setContent("");
      await dispatch(getAllFollowingPosts(user._id));
    }
  };

  // JSX Component Return Section
  return (
    <div className="create-comment__container">
      <img
        src={user?.avatar}
        alt="User Avatar"
        className="create-comment__user"
      />
      <form className="create-comment" onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="create-comment__input"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Sprinkle your thoughts here!"
        />
        <button type="submit" className="create-comment__button">
          <IoSend className="create-comment__button-icon" title="Comment" />
        </button>
      </form>
    </div>
  );
};

// Export Section
export { CreateComment };
