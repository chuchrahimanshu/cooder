import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllFollowingPosts,
  quoteOnComment,
} from "../../../redux/social/socialSlice";
import { TbTrash } from "react-icons/tb";

const CreateCommentQuote = ({ post, comment, setShowQuote }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!content?.trim()) {
      return toast.error("Content is required to quote");
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

  return (
    <div className="comment__quote">
      <section className="comment__quote--selected">
        <p>{`${comment.user?.firstName} ${comment.user?.lastName} . @${comment.user?.username}`}</p>
        <p>{comment.content}</p>
      </section>
      <section className="comment__quote--create">
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
          <button type="button" className="create-reply__button">
            <TbTrash
              className="create-reply__button-icon"
              title="Quote"
              onClick={() => setShowQuote(false)}
            />
          </button>
        </form>
      </section>
    </div>
  );
};

export { CreateCommentQuote };
