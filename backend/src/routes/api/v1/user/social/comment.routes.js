// Import Section
import express from "express";
import replyRouter from "./reply.routes.js";
import {
  createComment,
  deleteComment,
  quoteOnComment,
  reactionOnComment,
  updateComment,
} from "../../../../../controllers/api/v1/index.js";
import { verifyJWT, verifyUser } from "../../../../../middlewares/index.js";

// Configuration Section
const router = express.Router({ mergeParams: true });

// Middleware Section
router.use("/:commentid/replies", replyRouter);

// Authenticated Routes Section
router.route("/").post(verifyJWT, verifyUser, createComment);
router.route("/:commentid/update").patch(verifyJWT, verifyUser, updateComment);
router.route("/:commentid/delete").delete(verifyJWT, verifyUser, deleteComment);
router
  .route("/:commentid/reaction")
  .get(verifyJWT, verifyUser, reactionOnComment);
router.route("/:commentid/quote").post(verifyJWT, verifyUser, quoteOnComment);

// Export Section
export default router;
