// Import Section
import { asyncHandler } from "../../../../../utils/index.js";
import { Reply } from "../../../../../models/social/reply.model.js";

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

  return res.status(201).json(APIResponse(201, "Reply created successfully"));
});

export const getAllReplies = asyncHandler(async (req, res, next) => {});

export const getSingleReply = asyncHandler(async (req, res, next) => {});

export const updateReply = asyncHandler(async (req, res, next) => {});

export const deleteReply = asyncHandler(async (req, res, next) => {});
