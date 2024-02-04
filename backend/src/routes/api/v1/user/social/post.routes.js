// Import Section
import express from "express";
import commentRouter from "./comment.routes.js";
import { verifyJWT } from "../../../../../middlewares/auth.middleware.js";
import { verifyUser } from "../../../../../middlewares/user.middleware.js";
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
router
  .route("/")
  .get(verifyJWT, verifyUser, getAllPosts)
  .post(verifyJWT, verifyUser, createPost);
router
  .route("/:postid")
  .get(verifyJWT, verifyUser, getSinglePost)
  .patch(verifyJWT, verifyUser, updatePost)
  .delete(verifyJWT, verifyUser, deletePost);

// Non - Authenticated Routes Section
router.route("/:postid/reactions").get(reactionOnPost);

// Export Section
export default router;
