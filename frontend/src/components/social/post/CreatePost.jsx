// Import Section
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  getAllFollowingPosts,
} from "../../../redux/social/socialSlice";

// Import Utilities
import { FcAddImage, FcVideoCall } from "react-icons/fc";

const CreatePost = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // State Handling Section
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  // Form Handling Section
  const handleImageUpload = (event) => {
    setImages([...event.target.files]);
  };

  const handleVideoUpload = (event) => {
    setVideos([...event.target.files]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let data = new FormData();
    data.append("content", content);
    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }
    for (let i = 0; i < videos.length; i++) {
      data.append("videos", videos[i]);
    }

    const apiData = {
      paramsData: user._id,
      bodyData: data,
    };

    const result = await dispatch(createPost(apiData));

    if (result.meta.requestStatus === "fulfilled") {
      setContent("");
      setImages(null);
      setVideos(null);
      await dispatch(getAllFollowingPosts(user._id));
    }
  };

  // JSX Component Return Section
  return (
    <form className="create-post" onSubmit={handleFormSubmit}>
      <section className="create-post__top">
        <img
          src={user?.avatar}
          alt="User Avatar"
          className="create-post__top-image"
        />
        <textarea
          name="content"
          className="create-post__top-textarea"
          cols="30"
          rows="10"
          onChange={(event) => setContent(event.target.value)}
          value={content}
          placeholder="🔥 What's hot in your code world? 🌍"
        />
      </section>
      <section className="create-post__bottom">
        <section className="create-post__media">
          <label htmlFor="post-images">
            <FcAddImage className="create-post__media-icons" />
          </label>
          <input
            type="file"
            name="images"
            id="post-images"
            multiple
            accept="image/*"
            className="create-post__media-input"
            onChange={handleImageUpload}
          />
          <label htmlFor="post-videos">
            <FcVideoCall className="create-post__media-icons" />
          </label>
          <input
            type="file"
            name="videos"
            id="post-videos"
            multiple
            accept="video/*"
            className="create-post__media-input"
            onChange={handleVideoUpload}
          />{" "}
        </section>
        <button className="create-post__button" type="submit">
          Post
        </button>
      </section>
    </form>
  );
};

export { CreatePost };
