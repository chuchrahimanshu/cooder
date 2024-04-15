// Import Section
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  getAllFollowingPosts,
  quoteOnComment,
} from "../../../redux/social/socialSlice";

// Import Utilities
import { IoSend } from "react-icons/io5";
import { TbTrash } from "react-icons/tb";

// JSX Component Function
const CreateCommentQuote = ({ post, comment, setShowQuote }) => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);

  // State Handling Section
  const [content, setContent] = useState("");

  // Form Handling Section
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!content?.trim()) {
      return toast.error("Content is required to quote", {
        style: {
          fontSize: "17px",
        },
      });
    }

    const result = await dispatch(
      quoteOnComment({
        paramsData: {
          userid: user?._id,
          postid: post?._id,
          commentid: comment?._id,
        },
        bodyData: {
          content: content,
        },
      })
    );

    if (result.meta.requestStatus === "fulfilled") {
      setShowQuote(false);
      await dispatch(getAllFollowingPosts(user._id));
    }
  };

  // JSX Component Return Section
  return (
    <div className={`comment__quote ${theme}`}>
      <section className={`comment__quote--selected ${theme}`}>
        <p className="comment__quote-user">{`${comment.user?.firstName} ${comment.user?.lastName} . @${comment.user?.username}`}</p>
        <p className="comment__quote-content">{comment.content}</p>
      </section>
      <div
        className={`create-comment__container ${theme}`}
        id="create-comment__container">
        <img
          src={user?.avatar.url}
          alt="User Avatar"
          className="create-comment__user"
        />
        <form
          className={`create-comment ${theme}`}
          id="create-comment"
          onSubmit={handleFormSubmit}>
          <input
            type="text"
            className={`create-comment__input ${theme}`}
            id="create-comment__input--quote"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Sprinkle your thoughts here!"
          />
          <section className="create-comment__button--section">
            <button type="submit" className="create-comment__button">
              <IoSend
                className={`create-comment__button-icon ${theme}`}
                title="Comment"
              />
            </button>
            <button type="button" className="create-comment__button">
              <TbTrash
                className={`create-comment__button-icon ${theme}`}
                id="create-comment__delete-quote"
                title="Quote"
                onClick={() => setShowQuote(false)}
              />
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

// Export Section
export { CreateCommentQuote };
