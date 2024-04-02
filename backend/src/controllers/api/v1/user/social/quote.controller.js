import { Reply } from "../../../../../models/social/reply.model.js";
import { Comment } from "../../../../../models/social/comment.model.js";
import {
  APIError,
  APIResponse,
  asyncHandler,
} from "../../../../../utils/index.js";

export const quoteOnPost = asyncHandler(async (req, res, next) => {});

export const quoteOnComment = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { userid, postid, commentid } = req.params;

  if (!userid?.trim() || !postid?.trim() || !commentid?.trim()) {
    return res.status(500).json(new APIError(500, "Internal Server Error"));
  }

  const quote = await Comment.create({
    content: content,
    user: userid,
    post: postid,
    quote: commentid,
  });

  if (!quote) {
    return res.status(500).json(new APIError(500, "Internal Server Error"));
  }

  return res.status(201).json(new APIResponse(201, "Quoted Successfully"));
});

export const quoteOnReply = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { userid, postid, commentid, replyid } = req.params;

  if (
    !userid?.trim() ||
    !postid?.trim() ||
    !commentid?.trim() ||
    !replyid?.trim()
  ) {
    return res.status(500).json(new APIError(500, "Internal Server Error"));
  }

  const quote = await Reply.create({
    content: content,
    user: userid,
    post: postid,
    comment: commentid,
    quote: replyid,
  });

  if (!quote) {
    return res.status(500).json(new APIError(500, "Internal Server Error"));
  }

  return res.status(201).json(new APIResponse(201, "Quoted Successfully"));
});
