// Import Section
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getAllFollowingPosts,
  reactionOnComment,
  reactionOnPost,
  reactionOnReply,
} from "../../../redux/social/socialSlice";
import {
  TiArrowRepeat,
  TiEdit,
  TiHeartFullOutline,
  TiUserAdd,
} from "react-icons/ti";
import { TbCopy, TbEdit, TbPinFilled, TbTrash } from "react-icons/tb";
import { HiDotsHorizontal } from "react-icons/hi";
import { CreateComment } from "../comment/CreateComment";
import { CreateReply } from "../reply/CreateReply";

const Posts = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.social);
  const { user } = useSelector((state) => state.auth);
  console.log(posts);

  useEffect(() => {
    if (!posts) {
      dispatch(getAllFollowingPosts(user?._id));
    }
  }, [dispatch, user, posts]);

  // State Handling Section
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      {isLoading && <p>Posting...</p>}
      {!posts && (
        <p className="post__none">
          🤝 Engage Dev's: Follow for interactive developer community! 🚀
        </p>
      )}
      {posts &&
        posts.map((post) => (
          <div className="post" key={post._id}>
            <section className="post__header">
              <div className="post__header-user">
                <img
                  src={post.user?.avatar}
                  alt="User Avatar"
                  className="post__header-user-image"
                />
                <div>
                  <p className="post__header-user-name">{`${post.user?.firstName} ${post.user?.lastName}`}</p>
                  <p className="post__header-user-date">{post.updatedAt}</p>
                </div>
              </div>
              <HiDotsHorizontal
                className="post__header-options"
                onClick={() => {
                  if (showSettings === post._id) {
                    setShowSettings(false);
                  } else {
                    setShowSettings(post._id);
                  }
                }}
              />
              {showSettings === post._id && (
                <div className="post__header-options-menu">
                  <section className="post__header-options-section">
                    <TbPinFilled className="post__header-options-icon" />
                    <p className="post__header-options-text">Pin Post</p>
                  </section>
                  <section className="post__header-options-section">
                    <TbCopy className="post__header-options-icon" />
                    <p className="post__header-options-text">Copy Link</p>
                  </section>
                  {post.user?._id === user?._id && (
                    <>
                      <section className="post__header-options-section">
                        <TbEdit className="post__header-options-icon" />
                        <p className="post__header-options-text">Edit Post</p>
                      </section>
                      <section
                        className="post__header-options-section"
                        id="post__options-delete"
                        onClick={async () => {
                          const paramsData = {
                            userid: user._id,
                            postid: post._id,
                          };
                          await dispatch(deletePost(paramsData));
                          await dispatch(getAllFollowingPosts(user?._id));
                        }}>
                        <TbTrash className="post__header-options-icon" />
                        <p className="post__header-options-text">Delete Post</p>
                      </section>
                    </>
                  )}
                </div>
              )}
            </section>
            <section className="post__body">
              <p className="post__body-text">{post.content}</p>
              <section className="post__body-media">
                {post.images?.map((image, index) => (
                  <img
                    src={image}
                    alt="bg"
                    className="post__body-media-image"
                    key={index}
                  />
                ))}
                {post.videos?.map((video, index) => (
                  <video
                    src={video}
                    className="post__body-media-video"
                    controls
                    key={index}></video>
                ))}
              </section>
            </section>
            <section className="post__footer">
              <section
                className="post__footer-section"
                id="post__like"
                onClick={async () => {
                  await dispatch(
                    reactionOnPost({ userid: user._id, postid: post._id })
                  );
                }}>
                <TiHeartFullOutline className="post__footer-section-icons" />
                <p className="post__footer-section-text">Like</p>
              </section>
              <section className="post__footer-section" id="post__comment">
                <TiEdit className="post__footer-section-icons" />
                <p className="post__footer-section-text">Comment</p>
              </section>
              <section className="post__footer-section" id="post__repost">
                <TiArrowRepeat className="post__footer-section-icons" />
                <p className="post__footer-section-text">Repost</p>
              </section>
              <section className="post__footer-section" id="post__follow">
                <TiUserAdd className="post__footer-section-icons" />
                <p className="post__footer-section-text">Follow</p>
              </section>
            </section>
            <CreateComment postid={post?._id} />
            {post?.comments && post?.comments?.length > 0 && (
              <ul>
                {post.comments.map((comment) => (
                  <li key={comment._id}>
                    <p>{comment.content}</p>
                    <p>{`${comment.user.firstName} ${comment.user.lastName}`}</p>
                    <p>{comment.user.username}</p>
                    <section
                      style={{
                        fontSize: 18,
                        fontWeight: 1000,
                        cursor: "pointer",
                      }}
                      onClick={async () => {
                        await dispatch(
                          reactionOnComment({
                            userid: user._id,
                            postid: post._id,
                            commentid: comment._id,
                          })
                        );
                      }}>
                      Comment Reaction
                    </section>
                    <CreateReply postid={post._id} commentid={comment._id} />
                    {comment?.replies && comment.replies?.length > 0 && (
                      <ul>
                        {comment.replies.map((reply) => (
                          <li key={reply._id}>
                            <p>{reply.content}</p>
                            <p>{`${reply.user?.firstName} ${reply.user?.lastName}`}</p>
                            <p>{reply.user?.username}</p>
                            <section
                              style={{
                                fontSize: 18,
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
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
    </>
  );
};

export { Posts };
