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
import snippetRouter from "./snippet/snippet.routes.js";
import followRouter from "./follow/follow.routes.js";
import ticketRouter from "./debugger/ticket.routes.js";

// Configuration Section
const router = express.Router({ mergeParams: true });

// Middleware Section
router.use("/:userid/posts", postRouter);
router.use("/:userid/tasks", taskRouter);
router.use("/:userid/snippets", snippetRouter);
router.use("/:userid/follows", followRouter);
router.use("/:userid/tickets", ticketRouter);

// Non - Authenticated Routes Section
router.route("/").get(getAllUsers);

// Authenticated Routes Section
router.route("/find/:userid").get(verifyJWT, verifyUser, getSingleUser);

// Export Section
export default router;
