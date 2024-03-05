// Import Section
import { Comment } from "../../../../../models/social/comment.model.js";
import {
  asyncHandler,
  APIResponse,
  APIError,
} from "../../../../../utils/index.js";

// Controller Actions - End Points
export const createComment = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { userid, postid } = req.params;

  if (!content?.trim()) {
    return res
      .status(401)
      .json(new APIError(401, "Content is required to comment"));
  }

  if (!userid || !postid) {
    return res.status(500).json(new APIError(500, "Internal Server Error"));
  }

  const comment = await Comment.create({
    user: userid,
    post: postid,
    content: content,
  });

  if (!comment) {
    return res.status(500).json(new APIError(500, "Internal Server Error"));
  }

  return res.status(201).json(APIResponse(201, "Comment created successfully"));
});

export const getAllComments = asyncHandler(async (req, res, next) => {});

export const getSingleComment = asyncHandler(async (req, res, next) => {});

export const updateComment = asyncHandler(async (req, res, next) => {});

export const deleteComment = asyncHandler(async (req, res, next) => {});
