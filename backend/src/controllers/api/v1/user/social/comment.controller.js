// Import Section
import mongoose from "mongoose";
import { Comment } from "../../../../../models/social/comment.model.js";
import { Reply } from "../../../../../models/social/reply.model.js";
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

  return res
    .status(201)
    .json(new APIResponse(201, "Comment created successfully"));
});

export const updateComment = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { commentid } = req.params;

  if (!content?.trim()) {
    return res
      .status(401)
      .json(new APIError(401, "Content is required to comment"));
  }

  if (!commentid) {
    return res.status(500).json(new APIError(500, "Internal Server Error"));
  }

  const comment = await Comment.findById(commentid);

  if (!comment) {
    return res.status(500).json(new APIError(500, "Comment not found"));
  }

  comment.content = content;
  await comment.save();

  return res.status(200).json(APIResponse(201, "Comment updated successfully"));
});

export const deleteComment = asyncHandler(async (req, res, next) => {
  const { commentid } = req.params;

  if (!commentid) {
    return res.status(500).json(new APIError(500, "Internal Server Error"));
  }

  const comment = await Comment.findById(commentid);

  if (!comment) {
    return res.status(500).json(new APIError(500, "Comment not found"));
  }

  // const replies = await Reply.aggregate([
  //   {
  //     $match: {
  //       comment: {
  //         $eq: new mongoose.Types.ObjectId(commentid),
  //       },
  //     },
  //   },
  // ]);

  // await Comment.findByIdAndDelete(commentid);

  return res.status(200).json(APIResponse(201, "Comment deleted successfully"));
});

export const getComment = asyncHandler(async (req, res, next) => {});

export const getAllComments = asyncHandler(async (req, res, next) => {});
