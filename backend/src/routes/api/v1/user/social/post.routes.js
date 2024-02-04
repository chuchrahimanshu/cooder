// Import Section
import express from "express";
import commentRouter from "./comment.routes.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  reactionOnPost,
  updatePost,
} from "../../../../../controllers/api/v1/index.js";

// Configuration Section
const router = express.Router({ mergeParams: true });

// Middleware Section
router.use("/:postid/comments", commentRouter);

// Authenticated Routes Section
router.route("/").get(getAllPosts).post(createPost);
router
  .route("/:postid")
  .get(getSinglePost)
  .patch(updatePost)
  .delete(deletePost);

// Non - Authenticated Routes Section
router.route("/:postid/reactions").get(reactionOnPost);

// Export Section
export default router;
