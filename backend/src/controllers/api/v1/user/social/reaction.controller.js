// Import Section
import mongoose from "mongoose";
import {
  PostReaction,
  CommentReaction,
  ReplyReaction,
} from "../../../../../models/index.js";
import {
  asyncHandler,
  APIError,
  APIResponse,
} from "../../../../../utils/index.js";

// Controller Actions - End Points
export const reactionOnPost = asyncHandler(async (req, res, next) => {
  const { userid, postid } = req.params;

  if (!userid || !postid) {
    return res
      .status(404)
      .json(new APIError(404, "Please provide valid credentials."));
  }

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
    return res
      .status(200)
      .json(new APIResponse(200, "Reaction updated successfully."));
  }

  await PostReaction.create({
    user: userid,
    post: postid,
  });

  return res
    .status(201)
    .json(new APIResponse(201, "Reaction created successfully."));
});

export const reactionOnComment = asyncHandler(async (req, res, next) => {
  const { userid, commentid } = req.params;

  if (!userid || !commentid) {
    return res
      .status(404)
      .json(new APIError(404, "Please provide valid credentials."));
  }

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
    return res
      .status(200)
      .json(new APIResponse(200, "Reaction updated successfully."));
  }

  await CommentReaction.create({
    user: userid,
    comment: commentid,
  });

  return res
    .status(201)
    .json(new APIResponse(201, "Reaction created successfully."));
});

export const reactionOnReply = asyncHandler(async (req, res, next) => {
  const { userid, replyid } = req.params;

  if (!userid || !replyid) {
    return res
      .status(404)
      .json(new APIError(404, "Please provide valid credentials."));
  }

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
    return res
      .status(200)
      .json(new APIResponse(200, "Reaction updated successfully."));
  }

  await ReplyReaction.create({
    user: userid,
    reply: replyid,
  });

  return res
    .status(201)
    .json(new APIResponse(201, "Reaction created successfully."));
});
