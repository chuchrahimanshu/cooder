// Import Section
import mongoose from "mongoose";
import { Comment } from "../../../../../models/social/comment.model.js";
import { Reply } from "../../../../../models/social/reply.model.js";
import {
  asyncHandler,
  APIResponse,
  APIError,
} from "../../../../../utils/index.js";
import { ReplyReaction } from "../../../../../models/social/reply.reaction.model.js";
import { CommentReaction } from "../../../../../models/social/comment.reaction.model.js";

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
  const { userid, commentid } = req.params;

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

  if (userid?.toString() !== comment.user?.toString()) {
    return res.status(401).json(new APIError(500, "Unauthorized Access"));
  }

  comment.content = content;
  await comment.save();

  return res
    .status(201)
    .json(new APIResponse(201, "Comment updated successfully"));
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

  const replies = await Reply.aggregate([
    {
      $match: {
        comment: {
          $eq: new mongoose.Types.ObjectId(commentid),
        },
      },
    },
  ]);

  replies.forEach(async (reply) => {
    const replyReactions = await ReplyReaction.aggregate([
      {
        $match: {
          reply: {
            $eq: new mongoose.Types.ObjectId(reply._id),
          },
        },
      },
    ]);

    replyReactions.forEach(async (reaction) => {
      await ReplyReaction.findByIdAndDelete(reaction?._id);
    });

    await Reply.findByIdAndDelete(reply._id);
  });

  const commentReactions = await CommentReaction.aggregate([
    {
      $match: {
        comment: {
          $eq: new mongoose.Types.ObjectId(commentid),
        },
      },
    },
  ]);

  commentReactions.forEach(async (reaction) => {
    await CommentReaction.findByIdAndDelete(reaction?._id);
  });

  await Comment.findByIdAndDelete(commentid);

  return res.status(200).json(APIResponse(201, "Comment deleted successfully"));
});
