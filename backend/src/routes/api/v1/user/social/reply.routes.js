// Import Section
import express from "express";
import {
  createReply,
  deleteReply,
  getAllReplies,
  getSingleReply,
  reactionOnReply,
  updateReply,
} from "../../../../../controllers/api/v1/index.js";

// Configuration Section
const router = express.Router({ mergeParams: true });

// Authenticated Routes Section
router.route("/").get(getAllReplies).post(createReply);
router
  .route("/:replyid")
  .get(getSingleReply)
  .patch(updateReply)
  .delete(deleteReply);

// Non - Authenticated Routes Section
router.route("/:replyid/reactions").get(reactionOnReply);

// Export Section
export default router;
