import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HiDotsHorizontal } from "react-icons/hi";
import {
  TiHeartFullOutline,
  TiUserAdd,
  TiArrowRepeat,
  TiEdit,
} from "react-icons/ti";
import { TbCopy, TbEdit, TbPinFilled, TbTrash } from "react-icons/tb";

const Post = () => {
  // Hooks Configuration
  const { user } = useSelector((state) => state.auth);

  // State Handling Section
  const [showSettings, setShowSettings] = useState(false);
  return (
    <div className="post">
      <section className="post__header">
        <div className="post__header-user">
          <img
            src={user?.avatar}
            alt="User Avatar"
            className="post__header-user-image"
          />
          <div>
            <p className="post__header-user-name">{`${user?.firstName} ${user?.lastName}`}</p>
            <p className="post__header-user-date">9 November 2024 . 23:29</p>
          </div>
        </div>
        <HiDotsHorizontal
          className="post__header-options"
          onClick={() => setShowSettings(!showSettings)}
        />
        {showSettings === true && (
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
        <p className="post__body-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
          explicabo, quas natus voluptatem velit ab optio recusandae debitis
          fuga animi architecto error omnis ipsum officiis incidunt consequatur
          nihil itaque maxime labore. Velit, placeat, quisquam, officiis veniam
          ullam explicabo repellendus similique inventore dolores laboriosam
          cumque obcaecati et totam vero numquam facere labore nemo beatae. Quod
          facere aliquam sed eligendi.
        </p>
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
    </div>
  );
};

export { Post };
