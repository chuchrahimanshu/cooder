// Import Section
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createReply,
  getAllFollowingPosts,
} from "../../../redux/social/socialSlice";

const CreateReply = ({ postid, commentid }) => {
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
    <div style={{ display: "flex" }}>
      <img src={user?.avatar} alt="User Avatar" height={30} />
      <form className="create-comment" onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <button type="submit">Reply</button>
      </form>
    </div>
  );
};

// Export Section
export { CreateReply };
