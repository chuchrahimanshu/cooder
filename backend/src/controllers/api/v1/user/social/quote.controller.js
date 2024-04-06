import { Post, Comment, Reply } from "../../../../../models/index.js";
import {
  APIError,
  APIResponse,
  asyncHandler,
} from "../../../../../utils/index.js";

export const quoteOnPost = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { userid, postid } = req.params;

  if (!content?.trim()) {
    return res
      .status(401)
      .json(new APIError(401, "Content is required to quote."));
  }

  if (!userid?.trim() || !postid?.trim()) {
    return res
      .status(404)
      .json(new APIError(404, "Please provide valid credentials."));
  }

  const quote = await Post.create({
    content: content,
    user: userid,
    quote: postid,
  });

  if (!quote) {
    return res.status(500).json(new APIError(500, "Internal server error!"));
  }

  return res
    .status(201)
    .json(new APIResponse(201, "Quote created successfully."));
});

export const quoteOnComment = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { userid, postid, commentid } = req.params;

  if (!content?.trim()) {
    return res
      .status(401)
      .json(new APIError(401, "Content is required to quote."));
  }

  if (!userid?.trim() || !postid?.trim() || !commentid?.trim()) {
    return res
      .status(404)
      .json(new APIError(404, "Please provide valid credentials."));
  }

  const quote = await Comment.create({
    content: content,
    user: userid,
    post: postid,
    quote: commentid,
  });

  if (!quote) {
    return res.status(500).json(new APIError(500, "Internal server error!"));
  }

  return res
    .status(201)
    .json(new APIResponse(201, "Quote created successfully."));
});

export const quoteOnReply = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { userid, postid, commentid, replyid } = req.params;

  if (!content?.trim()) {
    return res
      .status(401)
      .json(new APIError(401, "Content is required to quote."));
  }

  if (
    !userid?.trim() ||
    !postid?.trim() ||
    !commentid?.trim() ||
    !replyid?.trim()
  ) {
    return res
      .status(404)
      .json(new APIError(404, "Please provide valid credentials."));
  }

  const quote = await Reply.create({
    content: content,
    user: userid,
    post: postid,
    comment: commentid,
    quote: replyid,
  });

  if (!quote) {
    return res.status(500).json(new APIError(500, "Internal server error!"));
  }

  return res
    .status(201)
    .json(new APIResponse(201, "Quote created successfully."));
});
