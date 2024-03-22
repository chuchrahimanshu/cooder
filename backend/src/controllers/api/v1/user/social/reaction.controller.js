// Import Section
import { asyncHandler } from "../../../../../utils/asyncHandler.util.js";
import { PostReaction } from "../../../../../models/social/post.reaction.model.js";
import mongoose from "mongoose";
import { APIResponse } from "../../../../../utils/responseHandler.util.js";
import { CommentReaction } from "../../../../../models/social/comment.reaction.model.js";
import { ReplyReaction } from "../../../../../models/social/reply.reaction.model.js";

// Controller Actions - End Points
export const reactionOnPost = asyncHandler(async (req, res, next) => {
  const { userid, postid } = req.params;

  const alreadyReacted = await PostReaction.aggregate([
    {
      $match: {
        $and: [
          {
            user: {
              $eq: new mongoose.Types.ObjectId(userid),
            },
          },
          {
            post: {
              $eq: new mongoose.Types.ObjectId(postid),
            },
          },
        ],
      },
    },
  ]);

  if (alreadyReacted?.length > 0) {
    await PostReaction.findByIdAndDelete(alreadyReacted[0]?._id);
    return res.status(200).json(new APIResponse(200, "Un-Reacted!"));
  }

  await PostReaction.create({
    user: userid,
    post: postid,
  });

  return res.status(201).json(new APIResponse(201, "Reacted!"));
});

export const reactionOnComment = asyncHandler(async (req, res, next) => {
  const { userid, commentid } = req.params;

  const alreadyReacted = await CommentReaction.aggregate([
    {
      $match: {
        $and: [
          {
            user: {
              $eq: new mongoose.Types.ObjectId(userid),
            },
          },
          {
            comment: {
              $eq: new mongoose.Types.ObjectId(commentid),
            },
          },
        ],
      },
    },
  ]);

  if (alreadyReacted?.length > 0) {
    await CommentReaction.findByIdAndDelete(alreadyReacted[0]?._id);
    return res.status(200).json(new APIResponse(200, "Un-Reacted!"));
  }

  await CommentReaction.create({
    user: userid,
    comment: commentid,
  });

  return res.status(201).json(new APIResponse(201, "Reacted!"));
});

export const reactionOnReply = asyncHandler(async (req, res, next) => {
  const { userid, replyid } = req.params;

  const alreadyReacted = await ReplyReaction.aggregate([
    {
      $match: {
        $and: [
          {
            user: {
              $eq: new mongoose.Types.ObjectId(userid),
            },
          },
          {
            reply: {
              $eq: new mongoose.Types.ObjectId(replyid),
            },
          },
        ],
      },
    },
  ]);

  if (alreadyReacted?.length > 0) {
    await ReplyReaction.findByIdAndDelete(alreadyReacted[0]?._id);
    return res.status(200).json(new APIResponse(200, "Un-Reacted!"));
  }

  await ReplyReaction.create({
    user: userid,
    reply: replyid,
  });

  return res.status(201).json(new APIResponse(201, "Reacted!"));
});
