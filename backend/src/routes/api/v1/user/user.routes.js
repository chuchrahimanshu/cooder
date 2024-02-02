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
import taskRouter from "./task/task.routes.js";

// Configuration Section
const router = express.Router({ mergeParams: true });

// Middleware Section
router.use("/:userid/posts", postRouter);
router.use("/:userid/tasks", taskRouter);

// Non - Authenticated Routes Section
router.route("/").get(getAllUsers);

// Authenticated Routes Section
router.route("/:userid").get(verifyJWT, verifyUser, getSingleUser);

// Export Section
export default router;
