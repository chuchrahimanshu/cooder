// Import Section
import express from "express";
import {
  createReply,
  deleteReply,
  quoteOnReply,
  reactionOnReply,
  updateReply,
} from "../../../../../controllers/api/v1/index.js";
import { verifyJWT, verifyUser } from "../../../../../middlewares/index.js";

// Configuration Section
const router = express.Router({ mergeParams: true });

// Authenticated Routes Section
router.route("/").post(verifyJWT, verifyUser, createReply);
router.route("/:replyid/update").patch(verifyJWT, verifyUser, updateReply);
router.route("/:replyid/delete").delete(verifyJWT, verifyUser, deleteReply);
router.route("/:replyid/reaction").get(verifyJWT, verifyUser, reactionOnReply);
router.route("/:replyid/quote").get(verifyJWT, verifyUser, quoteOnReply);

// Export Section
export default router;
