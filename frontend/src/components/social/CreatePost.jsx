// Import Section
import React from "react";
import { useSelector } from "react-redux";

// Import Utilities
import { FcAddImage, FcVideoCall } from "react-icons/fc";

const CreatePost = () => {
  // Hooks Configuration
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="create-post">
      <section className="create-post__top">
        <img
          src={user?.avatar}
          alt="User Avatar"
          className="create-post__top-image"
        />
        <textarea
          name=""
          className="create-post__top-textarea"
          cols="30"
          rows="10"
          placeholder="🔥 What's hot in your code world? 🌍"
        />
      </section>
      <section className="create-post__bottom">
        <section className="create-post__media">
          <FcAddImage className="create-post__media-icons" />
          <FcVideoCall className="create-post__media-icons ml-1" />
        </section>
        <button className="create-post__button">Post</button>
      </section>
    </div>
  );
};

export { CreatePost };
