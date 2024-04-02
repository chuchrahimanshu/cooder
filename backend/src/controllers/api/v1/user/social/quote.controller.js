import { ReplyQuote } from "../../../../../models/social/reply.quote.model.js";
import {
  APIError,
  APIResponse,
  asyncHandler,
} from "../../../../../utils/index.js";

export const quoteOnPost = asyncHandler(async (req, res, next) => {});

export const quoteOnComment = asyncHandler(async (req, res, next) => {});

export const quoteOnReply = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { userid, replyid } = req.params;

  if (!userid?.trim() || !replyid?.trim()) {
    return res.status(500).json(new APIError(500, "Internal Server Error"));
  }

  const quote = await ReplyQuote.create({
    quote: content,
    user: userid,
    reply: replyid,
  });

  if (!quote) {
    return res.status(500).json(new APIError(500, "Internal Server Error"));
  }

  return res.status(201).json(new APIResponse(201, "Quoted Successfully"));
});
