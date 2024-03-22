// Import Section
import express from "express";
import {
  createReply,
  deleteReply,
  getAllReplies,
  getReply,
  reactionOnReply,
  updateReply,
} from "../../../../../controllers/api/v1/index.js";

// Configuration Section
const router = express.Router({ mergeParams: true });

// Authenticated Routes Section
router.route("/").get(getAllReplies).post(createReply);
router.route("/:replyid/get").get(getReply);
router.route("/:replyid/update").patch(updateReply);
router.route("/:replyid/delete").delete(deleteReply);

// Non - Authenticated Routes Section
router.route("/:replyid/reaction").get(reactionOnReply);

// Export Section
export default router;
