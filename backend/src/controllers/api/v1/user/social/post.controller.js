// Import Section
import {
  CLOUDINARY_POST_IMAGE,
  CLOUDINARY_POST_VIDEO,
} from "../../../../../constants.js";
import { Post } from "../../../../../models/social/post.model.js";
import {
  APIError,
  APIResponse,
  asyncHandler,
  uploadMediaToCloudinary,
} from "../../../../../utils/index.js";

// Controller Actions - End Points
export const createPost = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { userid } = req.params;

  const post = await Post.create({
    user: userid,
    content: content,
  });

  const imageUploadPromise = new Promise(async (resolve, reject) => {
    if (
      req.files &&
      Array.isArray(req.files.images) &&
      req.files.images.length > 0
    ) {
      const { images } = req.files;
      await Promise.all(
        images.map(async (image) => {
          const imageLocalPath = image.path;
          const { secure_url } = await uploadMediaToCloudinary(
            imageLocalPath,
            CLOUDINARY_POST_IMAGE
          );
          post.images.push(secure_url);
        })
      );
    }
    resolve();
  });

  const videoUploadPromise = new Promise(async (resolve, reject) => {
    if (
      req.files &&
      Array.isArray(req.files.videos) &&
      req.files.videos.length > 0
    ) {
      const { videos } = req.files;
      await Promise.all(
        videos.map(async (video) => {
          const videoLocalPath = video.path;
          const { secure_url } = await uploadMediaToCloudinary(
            videoLocalPath,
            CLOUDINARY_POST_VIDEO
          );
          post.videos.push(secure_url);
        })
      );
    }
    resolve();
  });

  Promise.all([imageUploadPromise, videoUploadPromise])
    .then(() => {
      return post.save();
    })
    .then(() => {
      return res
        .status(201)
        .json(new APIResponse(201, "Post Created Successfully"));
    })
    .catch(async (error) => {
      await Post.findByIdAndDelete(post._id);
      return res
        .status(500)
        .json(new APIResponse(500, "Internal Server Error"));
    });
});

export const updatePost = asyncHandler(async (req, res, next) => {});

export const deletePost = asyncHandler(async (req, res, next) => {});

export const getAllPosts = asyncHandler(async (req, res, next) => {});

export const getSinglePost = asyncHandler(async (req, res, next) => {});
