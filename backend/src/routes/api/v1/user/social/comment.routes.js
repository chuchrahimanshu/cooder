// Import Section
import express from "express";
import replyRouter from "./reply.routes.js";
import {
  createComment,
  deleteComment,
  getAllComments,
  getComment,
  reactionOnComment,
  updateComment,
} from "../../../../../controllers/api/v1/index.js";

// Configuration Section
const router = express.Router({ mergeParams: true });

// Middleware Section
router.use("/:commentid/replies", replyRouter);

// Authenticated Routes Section
router.route("/").get(getAllComments).post(createComment);
router.route("/:commentid/get").get(getComment);
router.route("/:commentid/update").patch(updateComment);
router.route("/:commentid/delete").delete(deleteComment);

// Non - Authenticated Routes Section
router.route("/:commentid/reactions").get(reactionOnComment);

// Export Section
export default router;
