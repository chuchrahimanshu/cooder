// Import Section
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllFollowingPosts,
  quoteOnReply,
} from "../../../redux/social/socialSlice";

// Import Utilities
import { TbTrash } from "react-icons/tb";
import { IoSend } from "react-icons/io5";

// JSX Component Function
const CreateReplyQuote = ({ post, comment, reply, setShowQuote }) => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);

  // State Handling Section
  const [content, setContent] = useState("");

  // Form Handling Section
  const handleQuoteReply = async (event) => {
    event.preventDefault();

    if (!content?.trim()) {
      return toast.error("Content is required to quote");
    }

    const result = await dispatch(
      quoteOnReply({
        paramsData: {
          userid: user?._id,
          postid: post?._id,
          commentid: comment?._id,
          replyid: reply?._id,
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
    <div className={`reply__quote ${theme}`}>
      <section className={`reply__quote--selected ${theme}`}>
        <p className="reply__quote-user">{`${reply.user?.firstName} ${reply.user?.lastName} . @${reply.user?.username}`}</p>
        <p className="reply__quote-content">{reply.content}</p>
      </section>
      <div
        style={{ display: "flex" }}
        className="create-reply__container"
        id="create-reply__container">
        <img
          src={user?.avatar}
          alt="User Avatar"
          className="create-reply__user"
        />
        <form
          className={`create-reply ${theme}`}
          id="create-reply"
          onSubmit={handleQuoteReply}>
          <input
            type="text"
            value={content}
            id="create-reply__input--quote"
            onChange={(event) => setContent(event.target.value)}
            className={`create-reply__input ${theme}`}
            placeholder="Unleash your creative comeback!"
          />
          <section className="create-reply__button--section">
            <button type="submit" className="create-reply__button">
              <IoSend
                className={`create-reply__button-icon ${theme}`}
                title="Reply"
              />
            </button>
            <button type="button" className="create-reply__button">
              <TbTrash
                className={`create-reply__button-icon ${theme}`}
                id="create-reply__delete-quote"
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
export { CreateReplyQuote };
