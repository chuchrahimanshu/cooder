// Import Section
import express from "express";

// Configuration Section
const router = express.Router();

// Authenticated Routes Section
router.route("/").get(getAllReplies).post(createReply);
router.route("/:id").get(getSingleReply).patch(updateReply).delete(deleteReply);
router.route("/:id/reactions").get(reactionOnReply);

// Export Section
export default router;
