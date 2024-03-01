import React from "react";
import { useSelector } from "react-redux";
import { HiDotsHorizontal } from "react-icons/hi";

const Post = () => {
  // Hooks Configuration
  const { user } = useSelector((state) => state.auth);
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
        <HiDotsHorizontal className="post__header-options" />
      </section>
    </div>
  );
};

export { Post };
