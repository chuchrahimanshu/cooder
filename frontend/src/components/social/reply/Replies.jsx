// Import Section
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteReply,
  getAllFollowingPosts,
  reactionOnReply,
  updateReply,
} from "../../../redux/social/socialSlice";

// Import Components
import { CreateReplyQuote } from "../../index";

// Import Utilities
import { TiHeart } from "react-icons/ti";
import { PiQuotesFill } from "react-icons/pi";
import { TbEdit, TbTrash } from "react-icons/tb";
import { MdOutlineUpdate } from "react-icons/md";
import { FaCode } from "react-icons/fa";

// JSX Component Function
const Replies = ({ comment, post }) => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);

  // State Handling Section
  const editState = {
    _id: "",
    content: "",
  };
  const [editReply, setEditReply] = useState(editState);
  const [showSettings, setShowSettings] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  // Form Handling Section
  const handleUpdateReply = async (event) => {
    event.preventDefault();

    if (!editReply.content?.trim()) {
      return toast.error("Content is required to update");
    }

    const result = await dispatch(
      updateReply({
        paramsData: {
          userid: user?._id,
          postid: post?._id,
          commentid: comment?._id,
          replyid: editReply._id,
        },
        bodyData: {
          content: editReply.content,
        },
      })
    );

    if (result.meta.requestStatus === "fulfilled") {
      setEditReply(editState);
      await dispatch(getAllFollowingPosts(user._id));
    }
  };

  // JSX Component Return Section
  return (
    <>
      {comment?.replies && comment.replies?.length > 0 && (
        <ul className="reply">
          {comment.replies.map((reply) => (
            <li key={reply._id} className="reply__list">
              <section className="reply__list-header">
                <section className="reply__list-header-user">
                  <img
                    src={reply.user?.avatar.url}
                    alt="User Avatar"
                    className="reply__list-avatar"
                  />
                  <section className={`reply__list-user ${theme}`}>
                    <p className="reply__list-user-name">{`${reply.user?.firstName} ${reply.user?.lastName}`}</p>
                    <p className="reply__list-user-username">
                      {`@${reply.user?.username}`}
                    </p>
                  </section>
                </section>
                {(reply.user?._id === user?._id ||
                  post?.user?._id === user?._id) && (
                  <section className="reply__menu-container">
                    <FaCode
                      className={`reply__menu-icon ${theme}`}
                      onClick={() => {
                        if (showSettings === reply._id) {
                          setShowSettings(false);
                        } else {
                          setShowSettings(reply._id);
                        }
                      }}
                    />
                    {showSettings === reply._id && (
                      <section className={`reply__menu-items ${theme}`}>
                        {reply?.user?._id === user?._id && (
                          <section
                            className={`reply__menu-item ${theme}`}
                            onClick={() =>
                              setEditReply({
                                _id: reply?._id,
                                content: reply.content,
                              })
                            }>
                            <TbEdit className="reply__menu-item-icon" />
                            <p className="reply__menu-item-text">Edit Reply</p>
                          </section>
                        )}
                        {(reply.user?._id === user?._id ||
                          post?.user?._id === user?._id) && (
                          <section
                            className={`reply__menu-item ${theme}`}
                            id="reply__menu-delete"
                            onClick={async () => {
                              await dispatch(
                                deleteReply({
                                  userid: user?._id,
                                  postid: post?._id,
                                  commentid: comment?._id,
                                  replyid: reply?._id,
                                })
                              );
                              await dispatch(getAllFollowingPosts(user?._id));
                            }}>
                            <TbTrash className="reply__menu-item-icon" />
                            <p className="reply__menu-item-text">
                              Delete Reply
                            </p>
                          </section>
                        )}
                      </section>
                    )}
                  </section>
                )}
              </section>
              <section className={`reply__list-body ${theme}`}>
                <p className="reply__list-content">{reply.content}</p>
                <p className="reply__list-date">
                  {new Date(reply.createdAt).toUTCString()}
                </p>
              </section>
              {reply?.quote ? (
                <div className={`reply__quoted-container ${theme}`}>
                  <section className={`reply__quoted ${theme}`}>
                    <p className="reply__quoted-user">{`${reply.quote?.user?.firstName} ${reply.quote?.user?.lastName} . @${reply.quote?.user?.username}`}</p>
                    <p className="reply__quoted-content">
                      {reply.quote?.content}
                    </p>
                  </section>
                </div>
              ) : null}
              <section className={`reply__list-footer ${theme}`}>
                <TiHeart
                  id="reply__reaction"
                  className={`reply__list-footer-icons-primary ${
                    reply.reacted === true ? "c-red" : ""
                  }`}
                  title="Reaction"
                  onClick={async () => {
                    await dispatch(
                      reactionOnReply({
                        userid: user?._id,
                        postid: post?._id,
                        commentid: comment?._id,
                        replyid: reply?._id,
                      })
                    );
                    await dispatch(getAllFollowingPosts(user?._id));
                  }}
                />
                {reply.replyReactions?.length > 0 ? (
                  <p className="reply__list-footer-text">
                    {reply.replyReactions.length}
                  </p>
                ) : null}
                <PiQuotesFill
                  className="reply__list-footer-icons-secondary"
                  id="reply__quote"
                  title="Quote"
                  onClick={() => setShowQuote(reply?._id)}
                />
              </section>
              {showQuote === reply?._id && (
                <CreateReplyQuote
                  post={post}
                  comment={comment}
                  reply={reply}
                  setShowQuote={setShowQuote}
                />
              )}
              {editReply._id === reply?._id && (
                <section className="reply__update">
                  <form className="create-reply" onSubmit={handleUpdateReply}>
                    <input
                      type="text"
                      value={editReply.content}
                      onChange={(event) =>
                        setEditReply({
                          ...editReply,
                          content: event.target.value,
                        })
                      }
                      className="create-reply__input"
                      placeholder="Update your creative comeback!"
                    />
                    <button type="submit" className="create-reply__button">
                      <MdOutlineUpdate
                        className="create-reply__button-icon"
                        title="Reply"
                      />
                    </button>
                    <button
                      type="button"
                      className="create-reply__button"
                      onClick={() => setEditReply(editState)}>
                      <TbTrash
                        className="create-reply__button-icon"
                        title="Reply"
                      />
                    </button>
                  </form>
                </section>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

// Export Section
export { Replies };
