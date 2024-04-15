// Import Section
import express from "express";
import postRouter from "./social/post.routes.js";
import followRouter from "./follow/follow.routes.js";
import {
  getAllUsers,
  updateUser,
} from "../../../../controllers/api/v1/user/user.controller.js";
import {
  upload,
  verifyJWT,
  verifyUser,
} from "../../../../middlewares/index.js";

// Configuration Section
const router = express.Router({ mergeParams: true });

// Middleware Section
router.use("/:userid/posts", postRouter);
router.use("/:userid/follows", followRouter);

// Authenticated Routes
router.route("/:userid/update").put(
  verifyJWT,
  verifyUser,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  updateUser
);

// Non - Authenticated Routes Section
router.route("/").get(getAllUsers);

// Export Section
export default router;
