// Import Section
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFollowingPosts } from "../../../redux/social/socialSlice";
import {
  TiArrowRepeat,
  TiEdit,
  TiHeartFullOutline,
  TiUserAdd,
} from "react-icons/ti";
import { TbCopy, TbEdit, TbPinFilled, TbTrash } from "react-icons/tb";
import { HiDotsHorizontal } from "react-icons/hi";
import { CreateComment } from "../comment/CreateComment";

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

  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
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
                  <section className="post__header-options-section">
                    <TbEdit className="post__header-options-icon" />
                    <p className="post__header-options-text">Edit Post</p>
                  </section>
                  <section
                    className="post__header-options-section"
                    id="post__options-delete">
                    <TbTrash className="post__header-options-icon" />
                    <p className="post__header-options-text">Delete Post</p>
                  </section>
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
                    key={index}
                    className="post__body-media-video"
                    controls></video>
                ))}
              </section>
            </section>
            <section className="post__footer">
              <section className="post__footer-section" id="post__like">
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
            <CreateComment />
          </div>
        ))}
    </>
  );
};

export { Posts };
