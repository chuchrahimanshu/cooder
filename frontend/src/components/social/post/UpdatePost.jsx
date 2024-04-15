import React, { useState } from "react";
import { IoIosCloseCircle, IoIosVideocam, IoMdImages } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFollowingPosts,
  updatePost,
} from "../../../redux/social/socialSlice";
import toast from "react-hot-toast";

const UpdatePost = ({ post, setShowUpdatePost }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);

  const [updateContent, setUpdateContent] = useState(post?.content);
  const [updateImages, setUpdateImages] = useState(post?.images);
  const [updateVideos, setUpdateVideos] = useState(post?.videos);
  const [displayMediaType, setDisplayMediaType] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const maxFileSize = 10 * 1024 * 1024;

    for (let i = 0; i < updateImages?.length; i++) {
      if (updateImages[i].size > maxFileSize) {
        return toast.error("File size exceeds the limit of 10MB", {
          style: {
            fontSize: "17px",
          },
        });
      }
    }
    for (let i = 0; i < updateVideos?.length; i++) {
      if (updateVideos[i].size > maxFileSize) {
        return toast.error("File size exceeds the limit of 10MB", {
          style: {
            fontSize: "17px",
          },
        });
      }
    }

    let data = new FormData();
    data.append("content", updateContent);
    for (let i = 0; i < updateImages?.length; i++) {
      data.append("images", updateImages[i]);
    }
    for (let i = 0; i < updateVideos?.length; i++) {
      data.append("videos", updateVideos[i]);
    }

    const apiData = {
      paramsData: user._id,
      bodyData: data,
    };

    setUpdateContent("");
    setUpdateImages(null);
    setUpdateVideos(null);
    const result = await dispatch(updatePost(apiData));

    if (result.meta.requestStatus === "fulfilled") {
      await dispatch(getAllFollowingPosts(user._id));
    }
    setLoading(false);
  };

  return (
    <div className="update-post__selection">
      <section className="update-post__container">
        <div className="update-post">
          <form className={`create-post ${theme}`} onSubmit={handleFormSubmit}>
            <section className="create-post__top">
              <img
                src={user?.avatar.url}
                alt="User Avatar"
                className="create-post__top-image"
              />
              <textarea
                name="updateContent"
                className={`create-post__top-textarea ${theme}`}
                cols="30"
                rows="10"
                maxLength={200}
                onChange={(event) => setUpdateContent(event.target.value)}
                value={updateContent}
                placeholder="🔥 What's hot in your code world? 🌍"
              />
            </section>
            {((updateImages && updateImages?.length > 0) ||
              (updateVideos && updateVideos?.length > 0)) && (
              <section className="create-post__media-preview__container">
                <p
                  className="create-post__media-delete"
                  onClick={() => {
                    setUpdateImages([]);
                    setUpdateVideos([]);
                    setDisplayMediaType(false);
                  }}>
                  ❌
                </p>
                {displayMediaType === true && (
                  <section className="create-post__media-preview">
                    {updateImages &&
                      updateImages?.length > 0 &&
                      updateImages.map((image, index) => (
                        <img
                          src={image.url}
                          alt="bg"
                          className="create-post__media-show"
                          key={index}
                        />
                      ))}
                    {updateVideos &&
                      updateVideos?.length > 0 &&
                      updateVideos.map((video, index) => (
                        <video
                          src={video.url}
                          className="create-post__media-show"
                          controls
                          key={index}></video>
                      ))}
                  </section>
                )}
                {displayMediaType === false && (
                  <section className="create-post__media-preview">
                    {updateImages &&
                      updateImages?.length > 0 &&
                      updateImages.map((image, index) => (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="bg"
                          className="create-post__media-show"
                          key={index}
                        />
                      ))}
                    {updateVideos &&
                      updateVideos?.length > 0 &&
                      updateVideos.map((video, index) => (
                        <video
                          src={URL.createObjectURL(video)}
                          className="create-post__media-show"
                          controls
                          key={index}></video>
                      ))}
                  </section>
                )}
              </section>
            )}
            <section className="create-post__bottom">
              <section className="create-post__media">
                <label htmlFor="post-updateImages">
                  <IoMdImages
                    className={`create-post__media-icons ${theme}`}
                    title="Insert updateImages"
                  />
                </label>
                <input
                  type="file"
                  name="updateImages"
                  id="post-updateImages"
                  multiple
                  accept="image/*"
                  onChange={(event) => {
                    setUpdateImages([...event.target.files]);
                  }}
                  className="create-post__media-input"
                />
                <label htmlFor="post-updateVideos">
                  <IoIosVideocam
                    className={`create-post__media-icons ${theme}`}
                    title="Insert updateVideos"
                  />
                </label>
                <input
                  type="file"
                  name="updateVideos"
                  id="post-updateVideos"
                  multiple
                  accept="video/*"
                  className="create-post__media-input"
                  onChange={(event) => {
                    setUpdateVideos([...event.target.files]);
                  }}
                />{" "}
              </section>
              <div className="update-post__loader">
                <ThreeDots
                  visible={loading}
                  height="95"
                  width="95"
                  color={theme === "light" ? "#111111" : "#ffffff"}
                  secondaryColor={theme === "light" ? "#111111" : "#ffffff"}
                  radius="5"
                  ariaLabel="mutating-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
              <section className="update-post__flex">
                <button
                  className="create-post__button"
                  type="button"
                  onClick={() => setShowUpdatePost(false)}>
                  <IoIosCloseCircle
                    className={`create-post__button-icon ${theme}`}
                    title="Post"
                  />
                </button>
                <button className="create-post__button" type="submit">
                  <IoSend
                    className={`create-post__button-icon ${theme}`}
                    title="Post"
                  />
                </button>
              </section>
            </section>
          </form>
        </div>
      </section>
    </div>
  );
};

export { UpdatePost };
