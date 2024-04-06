// Import Section
import mongoose from "mongoose";
import {
  Post,
  Comment,
  CommentReaction,
  Reply,
  ReplyReaction,
} from "../../../../../models/index.js";
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
      .json(new APIError(401, "Content is required to comment."));
  }

  if (!userid || !postid) {
    return res
      .status(404)
      .json(new APIError(404, "Please provide valid credentials."));
  }

  const comment = await Comment.create({
    user: userid,
    post: postid,
    content: content,
  });

  if (!comment) {
    return res.status(500).json(new APIError(500, "Internal server error!"));
  }

  return res
    .status(201)
    .json(new APIResponse(201, "Comment created successfully."));
});

export const updateComment = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { userid, commentid } = req.params;

  if (!content?.trim()) {
    return res
      .status(401)
      .json(new APIError(401, "Content is required to comment."));
  }

  if (!userid || !commentid) {
    return res
      .status(404)
      .json(new APIError(404, "Please provide valid credentials."));
  }

  const comment = await Comment.findById(commentid);

  if (!comment) {
    return res.status(404).json(new APIError(404, "Comment not found."));
  }

  if (userid?.toString() !== comment.user?.toString()) {
    return res
      .status(401)
      .json(new APIError(401, "User is unauthorized for this action."));
  }

  comment.content = content;
  await comment.save();

  return res
    .status(200)
    .json(new APIResponse(200, "Comment updated successfully."));
});

export const deleteComment = asyncHandler(async (req, res, next) => {
  const { userid, postid, commentid } = req.params;

  if (!userid || !postid || !commentid) {
    return res
      .status(404)
      .json(new APIError(404, "Please provide valid credentials."));
  }

  const comment = await Comment.findById(commentid);

  if (!comment) {
    return res.status(404).json(new APIError(404, "Comment not found!"));
  }

  const post = await Post.findById(postid);

  if (!post) {
    return res
      .status(404)
      .json(new APIError(404, "Associated post not found!"));
  }

  if (
    userid.toString() !== comment.user?.toString() &&
    userid.toString() !== post.user?.toString()
  ) {
    return res
      .status(401)
      .json(new APIError(401, "User unauthorized for this action."));
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

  return res
    .status(200)
    .json(new APIResponse(201, "Comment deleted successfully."));
});
