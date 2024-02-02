// Import Section
import express from "express";
import commentRouter from "./comment.routes.js";

// Configuration Section
const router = express.Router();

// Middleware Section
router.use("/:id/comments", commentRouter);

// Authenticated Routes Section
router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getSinglePost).patch(updatePost).delete(deletePost);
router.route("/:id/reactions").get(reactionOnPost);

// Export Section
export default router;
