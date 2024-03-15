// Import Section
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Utilities
import { FcAddImage, FcVideoCall } from "react-icons/fc";
import { createPost } from "../../../redux/social/socialSlice";

const CreatePost = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [content, setContent] = useState("");
  const [images, setImages] = useState(null);
  const [videos, setVideos] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let data = new FormData();
    data.append("content", content);
    for (let i = 0; i < images.length; i++) {
      console.log(images[i]);
      data.append("images", images[i]);
    }
    for (let i = 0; i < videos.length; i++) {
      console.log(videos[i]);
      data.append("videos", videos[i]);
    }

    const apiData = {
      paramsData: user._id,
      bodyData: data,
    };

    const result = await dispatch(createPost(apiData));

    if (result.meta.requestStatus === "fulfilled") {
      setContent(null);
      setImages(null);
      setVideos(null);
    }
  };

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
            className="create-post__media-input"
            onChange={(event) => setImages(event.target.files)}
          />
          <label htmlFor="post-videos">
            <FcVideoCall className="create-post__media-icons" />
          </label>
          <input
            type="file"
            name="videos"
            id="post-videos"
            multiple
            className="create-post__media-input"
            onChange={(event) => setVideos(event.target.files)}
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
