// Import Section
import {
  APIError,
  APIResponse,
  asyncHandler,
} from "../../../../../utils/index.js";
import { Reply } from "../../../../../models/social/reply.model.js";
import { ReplyReaction } from "../../../../../models/social/reply.reaction.model.js";
import mongoose from "mongoose";
import { Post } from "../../../../../models/social/post.model.js";

// Controller Actions - End Points
export const createReply = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { userid, postid, commentid } = req.params;

  if (!content?.trim()) {
    return res
      .status(401)
      .json(new APIError(401, "Content is required to reply"));
  }

  if (!userid || !postid || !commentid) {
    return res.status(500).json(new APIError(500, "Internal Server Error"));
  }

  const reply = await Reply.create({
    user: userid,
    post: postid,
    comment: commentid,
    content: content,
  });

  if (!reply) {
    return res.status(500).json(new APIError(500, "Internal Server Error"));
  }

  return res
    .status(201)
    .json(new APIResponse(201, "Reply created successfully"));
});

export const updateReply = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { userid, replyid } = req.params;

  if (!content?.trim()) {
    return res
      .status(401)
      .json(new APIError(401, "Content is required to reply"));
  }

  if (!userid || !replyid) {
    return res.status(500).json(new APIError(500, "Internal Server Error"));
  }

  const reply = await Reply.findById(replyid);

  if (!reply) {
    return res.status(500).json(new APIError(500, "Reply not found"));
  }

  if (userid.toString() !== reply.user?.toString()) {
    return res.status(500).json(new APIError(401, "Unauthorized Access"));
  }

  reply.content = content;
  await reply.save();

  return res
    .status(200)
    .json(new APIResponse(201, "Reply updated successfully"));
});

export const deleteReply = asyncHandler(async (req, res, next) => {
  const { userid, postid, replyid } = req.params;

  if (!userid || !postid || !replyid) {
    return res.status(500).json(new APIError(500, "Internal Server Error"));
  }

  const reply = await Reply.findById(replyid);

  if (!reply) {
    return res.status(500).json(new APIError(500, "Reply not found"));
  }

  const post = await Post.findById(postid);

  if (!post) {
    return res.status(500).json(new APIError(500, "Associated Post not found"));
  }

  if (
    userid.toString() !== reply.user?.toString() &&
    userid.toString() !== post.user?.toString()
  ) {
    return res.status(500).json(new APIError(401, "Unauthorized Access"));
  }

  const replyReactions = await ReplyReaction.aggregate([
    {
      $match: {
        reply: {
          $eq: new mongoose.Types.ObjectId(replyid),
        },
      },
    },
  ]);

  replyReactions.forEach(async (reaction) => {
    await ReplyReaction.findByIdAndDelete(reaction?._id);
  });

  await Reply.findByIdAndDelete(replyid);

  return res
    .status(200)
    .json(new APIResponse(201, "Reply deleted successfully"));
});
