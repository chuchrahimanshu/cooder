// Import Section
import { Post } from "../../../../../models/social/post.model.js";
import { asyncHandler } from "../../../../../utils/asyncHandler.util.js";
import { APIError } from "../../../../../utils/errorHandler.util.js";
import { APIResponse } from "../../../../../utils/responseHandler.util.js";

// Controller Actions - End Points
export const getAllPosts = asyncHandler(async (req, res, next) => {
  const { userid } = req.params;
  const posts = await Post.find({ user: userid });
  return res.status(200).json(
    new APIResponse(200, "All posts fetched successfylly", {
      size: posts.length,
      posts,
    })
  );
});

export const getSinglePost = asyncHandler(async (req, res, next) => {
  const { postid } = req.params;
  const post = await Post.findById(postid);
  if (!post) {
    return res.status(400).json(new APIError(400, "Post not found"));
  }
  return res.status(200).json(
    new APIResponse(200, "Post fetched successfully", {
      post,
    })
  );
});

export const createPost = asyncHandler(async (req, res, next) => {});

export const updatePost = asyncHandler(async (req, res, next) => {});

export const deletePost = asyncHandler(async (req, res, next) => {});
