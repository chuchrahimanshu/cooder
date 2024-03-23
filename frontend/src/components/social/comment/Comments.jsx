import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  getAllFollowingPosts,
  reactionOnComment,
} from "../../../redux/social/socialSlice";
import { HiDotsHorizontal } from "react-icons/hi";
import { TbMessageCirclePlus, TbPinFilled } from "react-icons/tb";
import { TiHeart } from "react-icons/ti";
import { IoIosCopy } from "react-icons/io";
import { PiQuotesFill } from "react-icons/pi";

const Comments = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
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
                  <section className="comment__list-user">
                    <p className="comment__list-user-name">{`${comment.user?.firstName} ${comment.user?.lastName}`}</p>
                    <p className="comment__list-user-username">
                      {`@${comment.user?.username}`}
                    </p>
                  </section>
                </section>
                <section className="comment__list-menu-container">
                  <button className="comment__list-menu">
                    <HiDotsHorizontal className="comment__list-menu-icon" />
                  </button>
                  <section className="comment__list-menu-items"></section>
                </section>
              </section>
              <section className="comment__list-body">
                <p className="comment__list-content">{comment.content}</p>
                <p className="comment__list-date">
                  {new Date(comment.createdAt).toUTCString()}
                </p>
              </section>
              <section className="comment__list-footer">
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
                />
                {comment.replies?.length > 0 ? (
                  <p className="comment__list-footer-text">
                    {comment.replies.length}
                  </p>
                ) : null}
                <PiQuotesFill
                  className="comment__list-footer-icons-secondary"
                  id="comment__quote"
                />
                {comment.user?._id === post.user?._id && (
                  <TbPinFilled
                    className="comment__list-footer-icons-secondary"
                    title="Pin Comment"
                    id="comment__pin"
                  />
                )}
              </section>
              {/* <CreateReply postid={post._id} commentid={comment._id} /> */}
              {/* {comment?.replies && comment.replies?.length > 0 && (
                <ul>
                  {comment.replies.map((reply) => (
                    <li key={reply._id}>
                      <p>{reply.content}</p>
                      <p>{`${reply.user?.firstName} ${reply.user?.lastName}`}</p>
                      <p>{reply.user?.username}</p>

                      <section
                        style={{
                          fontSize: 14,
                          fontWeight: 1000,
                          cursor: "pointer",
                        }}
                        onClick={async () => {
                          await dispatch(
                            reactionOnReply({
                              userid: user._id,
                              postid: post._id,
                              commentid: comment._id,
                              replyid: reply._id,
                            })
                          );
                        }}>
                        Reply Reaction
                      </section>
                      <section
                        style={{
                          fontSize: 14,
                          fontWeight: 1000,
                          cursor: "pointer",
                        }}
                        onClick={async () => {
                          await dispatch(
                            deleteReply({
                              userid: user._id,
                              postid: post._id,
                              commentid: comment._id,
                              replyid: reply._id,
                            })
                          );
                          dispatch(getAllFollowingPosts(user?._id));
                        }}>
                        ❌
                      </section>
                    </li>
                  ))}
                </ul>
              )} */}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export { Comments };
