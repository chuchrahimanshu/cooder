// Import Section
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createRepost,
  deletePost,
  getAllFollowingPosts,
  reactionOnPost,
} from "../../../redux/social/socialSlice";

// Import Components
import { CreateComment, Comments } from "../../index";

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
import { FaCode } from "react-icons/fa";
import { PiQuotesFill } from "react-icons/pi";

// JSX Component Function
const Posts = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.social);

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
  const [showMedia, setShowMedia] = useState(false);

  // JSX Component Return Section
  return (
    <>
      {/* Shown - Following List is Empty! */}
      {!posts && (
        <p className={`post__none ${theme}`}>
          🤝 Engage Dev's: Follow for interactive developer community! 🚀
        </p>
      )}

      {/* Mapping all the Posts - Following + User */}
      {posts &&
        posts.map((post) => (
          <div className={`post ${theme}`} key={post._id}>
            <section className={`post__header ${theme}`}>
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
              <FaCode
                className={`post__header-options ${theme}`}
                onClick={() => {
                  if (showSettings === post._id) {
                    setShowSettings(false);
                  } else {
                    setShowSettings(post._id);
                  }
                }}
              />
              {showSettings === post._id && (
                <div className={`post__header-options-menu ${theme}`}>
                  <section className={`post__header-options-section ${theme}`}>
                    <TbPinFilled className="post__header-options-icon" />
                    <p className="post__header-options-text">Pin Post</p>
                  </section>
                  <section className={`post__header-options-section ${theme}`}>
                    <TbCopy className="post__header-options-icon" />
                    <p className="post__header-options-text">Copy Link</p>
                  </section>
                  {post.user?._id === user?._id && (
                    <>
                      <section
                        className={`post__header-options-section ${theme}`}>
                        <TbEdit className="post__header-options-icon" />
                        <p className="post__header-options-text">Edit Post</p>
                      </section>
                      <section
                        className={`post__header-options-section ${theme}`}
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
            <section className={`post__body ${theme}`}>
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

                {showMedia === post?._id ? (
                  <>
                    {post.images?.length + post.videos?.length === 2 && (
                      <section
                        className="post__body-media-show"
                        onClick={() => setShowMedia(false)}>
                        {post.images?.map((image, index) => (
                          <img
                            src={image}
                            alt="bg"
                            className="post__body-media-items"
                            key={index}
                          />
                        ))}
                        {post.videos?.map((video, index) => (
                          <video
                            src={video}
                            className="post__body-media-items"
                            controls
                            key={index}></video>
                        ))}
                      </section>
                    )}
                  </>
                ) : (
                  <>
                    {post.images?.length + post.videos?.length === 2 && (
                      <section
                        className="post__body-media-section"
                        onClick={() => setShowMedia(post?._id)}>
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
                      </section>
                    )}
                  </>
                )}

                {showMedia === post?._id ? (
                  <>
                    {post.images?.length + post.videos?.length === 3 && (
                      <section
                        className="post__body-media-show"
                        onClick={() => setShowMedia(false)}>
                        {post.images?.map((image, index) => (
                          <img
                            src={image}
                            alt="bg"
                            className="post__body-media-items"
                            key={index}
                          />
                        ))}
                        {post.videos?.map((video, index) => (
                          <video
                            src={video}
                            className="post__body-media-items"
                            controls
                            key={index}></video>
                        ))}
                      </section>
                    )}
                  </>
                ) : (
                  <>
                    {post.images?.length + post.videos?.length === 3 && (
                      <section
                        className="post__body-media-section"
                        onClick={() => setShowMedia(post?._id)}>
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
                      </section>
                    )}
                  </>
                )}

                {showMedia === post?._id ? (
                  <>
                    {showMedia === post?._id &&
                      post.images?.length + post.videos?.length >= 4 && (
                        <section
                          className="post__body-media-show"
                          onClick={() => setShowMedia(false)}>
                          {post.images?.map((image, index) => (
                            <img
                              src={image}
                              alt="bg"
                              className="post__body-media-items"
                              key={index}
                            />
                          ))}
                          {post.videos?.map((video, index) => (
                            <video
                              src={video}
                              className="post__body-media-items"
                              controls
                              key={index}></video>
                          ))}
                        </section>
                      )}
                  </>
                ) : (
                  <>
                    {post.images?.length + post.videos?.length >= 4 && (
                      <section
                        className="post__body-media-section"
                        onClick={() => setShowMedia(post?._id)}>
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
                      </section>
                    )}
                  </>
                )}
              </section>
            </section>
            <section className={`post__footer ${theme}`}>
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
                  onClick={async () => {
                    await dispatch(
                      createRepost({
                        userid: user?._id,
                        postid: post?._id,
                      })
                    );
                    await dispatch(getAllFollowingPosts(user?._id));
                  }}
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
                    className={`comment__toggle ${theme}`}
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

// Export Section
export { Posts };
