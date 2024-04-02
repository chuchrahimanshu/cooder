import React, { useState } from "react";
import { PiQuotesFill } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllFollowingPosts,
  quoteOnReply,
} from "../../../redux/social/socialSlice";
import { IoSend } from "react-icons/io5";

const CreateReplyQuote = ({ post, comment, reply, setShowQuote }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");

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

  return (
    <div className="reply__quote">
      <section className="reply__quote--selected">
        <p>{`${reply.user?.firstName} ${reply.user?.lastName} . @${reply.user?.username}`}</p>
        <p>{reply.content}</p>
      </section>
      <section className="reply__quote--create">
        <form className="create-reply" onSubmit={handleQuoteReply}>
          <input
            type="text"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="create-reply__input"
            placeholder="Update your creative comeback!"
          />
          <button type="submit" className="create-reply__button">
            <IoSend className="create-reply__button-icon" title="Quote" />
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

export { CreateReplyQuote };
