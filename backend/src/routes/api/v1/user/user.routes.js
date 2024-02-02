// Import Section
import express from "express";
import { verifyJWT } from "../../../../middlewares/auth.middleware.js";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../../../../controllers/api/v1/user/user.controller.js";
import { verifyUser } from "../../../../middlewares/user.middleware.js";
import postRouter from "./social/post.routes.js";

// Configuration Section
const router = express.Router();

// Middleware Section
router.use("/:id/posts", postRouter);

// Non - Authenticated Routes Section
router.route("/").get(getAllUsers);

// Authenticated Routes Section
router.route("/:id").get(verifyJWT, verifyUser, getSingleUser);

// Export Section
export default router;
