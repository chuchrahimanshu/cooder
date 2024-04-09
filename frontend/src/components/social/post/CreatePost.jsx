// Import Section
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MutatingDots } from "react-loader-spinner";
import {
  createPost,
  getAllFollowingPosts,
} from "../../../redux/social/socialSlice";

// Import Utilities
import { IoMdImages, IoIosVideocam } from "react-icons/io";
import { IoSend } from "react-icons/io5";

// JSX Component Function
const CreatePost = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);

  // State Handling Section
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form Handling Section
  const handleImageUpload = (event) => {
    setImages([...event.target.files]);
  };

  const handleVideoUpload = (event) => {
    setVideos([...event.target.files]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const maxFileSize = 10 * 1024 * 1024;

    for (let i = 0; i < images?.length; i++) {
      if (images[i].size > maxFileSize) {
        return toast.error("File size exceeds the limit of 10MB");
      }
    }
    for (let i = 0; i < videos?.length; i++) {
      if (videos[i].size > maxFileSize) {
        return toast.error("File size exceeds the limit of 10MB");
      }
    }

    let data = new FormData();
    data.append("content", content);
    for (let i = 0; i < images?.length; i++) {
      data.append("images", images[i]);
    }
    for (let i = 0; i < videos?.length; i++) {
      data.append("videos", videos[i]);
    }

    const apiData = {
      paramsData: user._id,
      bodyData: data,
    };

    setContent("");
    setImages(null);
    setVideos(null);
    const result = await dispatch(createPost(apiData));

    if (result.meta.requestStatus === "fulfilled") {
      await dispatch(getAllFollowingPosts(user._id));
    }
    setLoading(false);
  };

  // JSX Component Return Section
  return (
    <>
      <form className={`create-post ${theme}`} onSubmit={handleFormSubmit}>
        <section className="create-post__top">
          <img
            src={user?.avatar}
            alt="User Avatar"
            className="create-post__top-image"
          />
          <textarea
            name="content"
            className={`create-post__top-textarea ${theme}`}
            cols="30"
            rows="10"
            maxLength={200}
            onChange={(event) => setContent(event.target.value)}
            value={content}
            placeholder="🔥 What's hot in your code world? 🌍"
          />
        </section>
        {((images && images?.length > 0) || (videos && videos?.length > 0)) && (
          <section className="create-post__media-preview__container">
            <p
              className="create-post__media-delete"
              onClick={() => {
                setImages([]);
                setVideos([]);
              }}>
              ❌
            </p>
            <section className="create-post__media-preview">
              {images &&
                images?.length > 0 &&
                images.map((image, index) => (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="bg"
                    className="create-post__media-show"
                    key={index}
                  />
                ))}
              {videos &&
                videos?.length > 0 &&
                videos.map((video, index) => (
                  <video
                    src={URL.createObjectURL(video)}
                    className="create-post__media-show"
                    controls
                    key={index}></video>
                ))}
            </section>
          </section>
        )}
        <section className="create-post__bottom">
          <section className="create-post__media">
            <label htmlFor="post-images">
              <IoMdImages
                className={`create-post__media-icons ${theme}`}
                title="Insert Images"
              />
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
              <IoIosVideocam
                className={`create-post__media-icons ${theme}`}
                title="Insert Videos"
              />
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
            <IoSend
              className={`create-post__button-icon ${theme}`}
              title="Post"
            />
          </button>
        </section>
      </form>
      {loading === false && (
        <section className="create-post__loader">
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color={theme === "light" ? "#111111" : "#ffffff"}
            secondaryColor={theme === "light" ? "#111111" : "#ffffff"}
            radius="12"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p className={`create-post__loader--text ${theme}`}>
            🧙‍♂️ Wizards are sending your post out!" ✨🌎
          </p>
        </section>
      )}
    </>
  );
};

// Export Section
export { CreatePost };
