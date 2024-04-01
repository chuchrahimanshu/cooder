// Import Section
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getAllFollowingPosts,
  reactionOnPost,
} from "../../../redux/social/socialSlice";

// Import Utilities
import { TiArrowRepeat, TiHeart } from "react-icons/ti";
import {
  TbCopy,
  TbEdit,
  TbPinFilled,
  TbTrash,
  TbBookmarkFilled,
  TbMessageCirclePlus,
} from "react-icons/tb";
import { HiDotsHorizontal } from "react-icons/hi";
import { PiQuotesFill } from "react-icons/pi";
import { CreateComment } from "../comment/CreateComment";
import { Comments } from "../comment/Comments";

const Posts = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.social);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!posts) {
      dispatch(getAllFollowingPosts(user?._id));
    }
  }, [dispatch, user, posts]);

  // State Handling Section
  const [showSettings, setShowSettings] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [toggleComments, setToggleComments] = useState(true);
  const [mediaHover, setMediaHover] = useState(false);

  // JSX Component Return Section
  return (
    <>
      {/* Shown - Following List is Empty! */}
      {!posts && (
        <p className="post__none">
          🤝 Engage Dev's: Follow for interactive developer community! 🚀
        </p>
      )}

      {/* Mapping all the Posts - Following + User */}
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
                  <p className="post__header-user-date">
                    {new Date(post.createdAt).toUTCString()}
                  </p>
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
              <section
                className="post__body-media"
                onMouseOver={() => setMediaHover(post._id)}
                onMouseLeave={() => setMediaHover(false)}>
                {post.images?.length + post.videos?.length === 0 && null}
                {post.images?.length + post.videos?.length === 1 && (
                  <>
                    {post.images?.map((image, index) => (
                      <img
                        src={image}
                        alt="bg"
                        className="post__body-media-item-1"
                        key={index}
                      />
                    ))}
                    {post.videos?.map((video, index) => (
                      <video
                        src={video}
                        className="post__body-media-item-1"
                        controls
                        key={index}></video>
                    ))}
                  </>
                )}
                {post.images?.length + post.videos?.length === 2 && (
                  <>
                    {post.images?.map((image, index) => (
                      <img
                        src={image}
                        alt="bg"
                        className="post__body-media-item-2"
                        key={index}
                      />
                    ))}
                    {post.videos?.map((video, index) => (
                      <video
                        src={video}
                        className="post__body-media-item-2"
                        controls
                        key={index}></video>
                    ))}
                  </>
                )}
                {post.images?.length + post.videos?.length === 3 && (
                  <>
                    {post.images?.map((image, index) => (
                      <img
                        src={image}
                        alt="bg"
                        className="post__body-media-item-3"
                        key={index}
                      />
                    ))}
                    {post.videos?.map((video, index) => (
                      <video
                        src={video}
                        className="post__body-media-item-3"
                        controls
                        key={index}></video>
                    ))}
                  </>
                )}
                {post.images?.length + post.videos?.length >= 4 && (
                  <>
                    {mediaHover === post._id &&
                      post.images?.length + post.videos?.length > 4 && (
                        <div className="post__body-media-info">
                          <p className="post__body-media-info--text">{`+ ${
                            post.images?.length + post.videos?.length - 4
                          }`}</p>
                        </div>
                      )}
                    {post.images?.map((image, index) => (
                      <img
                        src={image}
                        alt="bg"
                        className="post__body-media-item-4"
                        key={index}
                      />
                    ))}
                    {post.videos?.map((video, index) => (
                      <video
                        src={video}
                        className="post__body-media-item-4"
                        controls
                        key={index}></video>
                    ))}
                  </>
                )}
              </section>
            </section>
            <section className="post__footer">
              <div className="post__footer-section">
                <TiHeart
                  title="Reaction"
                  onClick={async () => {
                    await dispatch(
                      reactionOnPost({ userid: user._id, postid: post._id })
                    );
                    await dispatch(getAllFollowingPosts(user?._id));
                  }}
                  className={`post__footer-icons-primary ${
                    post.reacted === true ? "c-red" : ""
                  }`}
                  id="post__reaction"
                />
                {post.postReactions?.length > 0 ? (
                  <p className="post__footer-text">
                    {post.postReactions?.length}
                  </p>
                ) : null}
                <TbMessageCirclePlus
                  title="Comment"
                  className="post__footer-icons-secondary"
                  id="post__comment"
                  onClick={() => {
                    if (showCommentSection === post._id) {
                      setShowCommentSection(false);
                    } else {
                      setShowCommentSection(post._id);
                    }
                  }}
                />
                {post.comments?.length > 0 ? (
                  <p className="post__footer-text">{post.comments?.length}</p>
                ) : null}
                <TiArrowRepeat
                  title="Repost"
                  className="post__footer-icons-primary"
                  id="post__repost"
                />
                <PiQuotesFill
                  title="Quote"
                  className="post__footer-icons-secondary"
                  id="post__quote"
                />
              </div>
              <div className="post__footer-section">
                <TbBookmarkFilled
                  title="Add to Bookmarks"
                  className="post__footer-icons-secondary"
                  id="post__bookmark"
                />
              </div>
            </section>
            {showCommentSection === post._id && (
              <>
                <CreateComment postid={post?._id} />
                {post.comments?.length > 0 && (
                  <p
                    className="comment__toggle"
                    onClick={() => setToggleComments(!toggleComments)}>
                    {toggleComments === true
                      ? "Hide Comments"
                      : "Show Comments"}
                  </p>
                )}
                {toggleComments === true && <Comments post={post} />}
              </>
            )}
          </div>
        ))}
    </>
  );
};

export { Posts };
