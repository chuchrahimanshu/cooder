// Import Section
import express from "express";
import replyRouter from "./reply.routes.js";

// Configuration Section
const router = express.Router();

// Middleware Section
router.use("/:id/replies", replyRouter);

// Authenticated Routes Section
router.route("/").get(getAllComments).post(createComment);
router
  .route("/:id")
  .get(getSingleComment)
  .patch(updateComment)
  .delete(deleteComment);
router.route("/:id/reactions").get(reactionOnComment);

// Export Section
export default router;
