// Import Section
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteComment,
  getAllFollowingPosts,
  reactionOnComment,
  updateComment,
} from "../../../redux/social/socialSlice";

// Import Components
import { Replies } from "../reply/Replies";
import { CreateReply } from "../reply/CreateReply";
import { CreateCommentQuote } from "../quote/CreateCommentQuote";

// Import Utilities
import { FaCode } from "react-icons/fa";
import {
  TbEdit,
  TbMessageCirclePlus,
  TbPinFilled,
  TbTrash,
} from "react-icons/tb";
import { TiHeart } from "react-icons/ti";
import { PiQuotesFill } from "react-icons/pi";
import { MdOutlineUpdate } from "react-icons/md";

// JSX Component Function
const Comments = ({ post }) => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);

  // State Handling Section
  const editState = {
    _id: "",
    content: "",
  };
  const [showReplySection, setShowReplySection] = useState(false);
  const [toggleReplies, setToggleReplies] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [editComment, setEditComment] = useState(editState);
  const [showQuote, setShowQuote] = useState(false);

  // Form Handling Section
  const handleEditComment = async (event) => {
    event.preventDefault();

    if (!editComment.content?.trim()) {
      return toast.error("Content is required to update comment");
    }

    const result = await dispatch(
      updateComment({
        paramsData: {
          userid: user?._id,
          postid: post?._id,
          commentid: editComment?._id,
        },
        bodyData: {
          content: editComment.content,
        },
      })
    );

    if (result.meta.requestStatus === "fulfilled") {
      setEditComment(editState);
      await dispatch(getAllFollowingPosts(user._id));
    }
  };

  // JSX Component Return Section
  return (
    <>
      {post?.comments && post?.comments?.length > 0 && (
        <ul className="comment">
          {post.comments.map((comment) => (
            <li key={comment._id} className="comment__list">
              <section className="comment__list-header">
                <section className="comment__list-header-user">
                  <img
                    src={comment.user?.avatar}
                    alt="User Avatar"
                    className="comment__list-avatar"
                  />
                  <section className={`comment__list-user ${theme}`}>
                    <p className="comment__list-user-name">{`${comment.user?.firstName} ${comment.user?.lastName}`}</p>
                    <p className="comment__list-user-username">
                      {`@${comment.user?.username}`}
                    </p>
                  </section>
                </section>
                {(comment.user?._id === user?._id ||
                  post.user?._id === user?._id) && (
                  <section className={`comment__menu-container ${theme}`}>
                    <FaCode
                      className={`comment__menu-icon ${theme}`}
                      onClick={() => {
                        if (showSettings === comment._id) {
                          setShowSettings(false);
                        } else {
                          setShowSettings(comment._id);
                        }
                      }}
                    />
                    {showSettings === comment._id && (
                      <section className={`comment__menu-items ${theme}`}>
                        {comment.user?._id === user?._id && (
                          <section
                            className={`comment__menu-item ${theme}`}
                            onClick={() =>
                              setEditComment({
                                _id: comment._id,
                                content: comment.content,
                              })
                            }>
                            <TbEdit className="comment__menu-item-icon" />
                            <p className="comment__menu-item-text">
                              Edit Comment
                            </p>
                          </section>
                        )}
                        {(comment.user?._id === user?._id ||
                          post.user?._id === user?._id) && (
                          <section
                            className={`comment__menu-item ${theme}`}
                            id="comment__menu-delete"
                            onClick={async () => {
                              await dispatch(
                                deleteComment({
                                  userid: user?._id,
                                  postid: post?._id,
                                  commentid: comment?._id,
                                })
                              );
                              await dispatch(getAllFollowingPosts(user?._id));
                            }}>
                            <TbTrash className="comment__menu-item-icon" />
                            <p className="comment__menu-item-text">
                              Delete Comment
                            </p>
                          </section>
                        )}
                      </section>
                    )}
                  </section>
                )}
              </section>
              <section className={`comment__list-body ${theme}`}>
                <p className="comment__list-content">{comment.content}</p>
                <p className="comment__list-date">
                  {new Date(comment.createdAt).toUTCString()}
                </p>
              </section>
              {comment?.quote ? (
                <div className={`comment__quoted-container ${theme}`}>
                  <section className={`comment__quoted ${theme}`}>
                    <p className="comment__quoted-user">{`${comment.quote?.user?.firstName} ${comment.quote?.user?.lastName} . @${comment.quote?.user?.username}`}</p>
                    <p className="comment__quoted-content">
                      {comment.quote?.content}
                    </p>
                  </section>
                </div>
              ) : null}
              <section className={`comment__list-footer ${theme}`}>
                <TiHeart
                  id="comment__reaction"
                  className={`comment__list-footer-icons-primary ${
                    comment.reacted === true ? "c-red" : ""
                  }`}
                  title="Reaction"
                  onClick={async () => {
                    await dispatch(
                      reactionOnComment({
                        userid: user?._id,
                        postid: post?._id,
                        commentid: comment?._id,
                      })
                    );
                    await dispatch(getAllFollowingPosts(user?._id));
                  }}
                />
                {comment.commentReactions?.length > 0 ? (
                  <p className="comment__list-footer-text">
                    {comment.commentReactions.length}
                  </p>
                ) : null}
                <TbMessageCirclePlus
                  id="comment__reply"
                  className="comment__list-footer-icons-secondary"
                  title="Reply"
                  onClick={() => {
                    if (showReplySection === comment._id) {
                      setShowReplySection(false);
                    } else {
                      setShowReplySection(comment._id);
                    }
                  }}
                />
                {comment.replies?.length > 0 ? (
                  <p className="comment__list-footer-text">
                    {comment.replies.length}
                  </p>
                ) : null}
                <PiQuotesFill
                  className="comment__list-footer-icons-secondary"
                  id="comment__quote"
                  onClick={() => setShowQuote(comment._id)}
                />
                {comment.user?._id === post.user?._id && (
                  <TbPinFilled
                    className="comment__list-footer-icons-secondary"
                    title="Pin Comment"
                    id="comment__pin"
                  />
                )}
              </section>
              {showQuote === comment?._id && (
                <CreateCommentQuote
                  post={post}
                  comment={comment}
                  setShowQuote={setShowQuote}
                />
              )}
              {editComment._id === comment._id && (
                <form className="create-comment" onSubmit={handleEditComment}>
                  <input
                    type="text"
                    className="create-comment__input"
                    value={editComment.content}
                    onChange={(event) =>
                      setEditComment({
                        ...editComment,
                        content: event.target.value,
                      })
                    }
                    placeholder="Sprinkle your thoughts here!"
                  />
                  <button type="submit" className="create-comment__button">
                    <MdOutlineUpdate
                      className="create-comment__button-icon"
                      title="Comment"
                    />
                  </button>
                  <button
                    type="button"
                    className="create-reply__button"
                    onClick={() => setEditComment(editState)}>
                    <TbTrash className="create-reply__button-icon" />
                  </button>
                </form>
              )}
              {showReplySection === comment._id && (
                <>
                  <CreateReply postid={post._id} commentid={comment._id} />
                  {comment.replies?.length > 0 && (
                    <p
                      className="reply__toggle"
                      onClick={() => setToggleReplies(!toggleReplies)}>
                      {toggleReplies === true ? "Hide Replies" : "Show Replies"}
                    </p>
                  )}
                  {toggleReplies === true && (
                    <Replies comment={comment} post={post} />
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

// Export Section
export { Comments };
