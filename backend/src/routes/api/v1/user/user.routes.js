// Import Section
import express from "express";
import postRouter from "./social/post.routes.js";
import followRouter from "./follow/follow.routes.js";
import { getAllUsers } from "../../../../controllers/api/v1/user/user.controller.js";

// Configuration Section
const router = express.Router({ mergeParams: true });

// Middleware Section
router.use("/:userid/posts", postRouter);
router.use("/:userid/follows", followRouter);

// Non - Authenticated Routes Section
router.route("/").get(getAllUsers);

// Export Section
export default router;
