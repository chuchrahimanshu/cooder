// Import Section
import express from "express";
import commentRouter from "./comment.routes.js";
import { verifyJWT } from "../../../../../middlewares/auth.middleware.js";
import { verifyUser } from "../../../../../middlewares/user.middleware.js";
import { upload } from "../../../../../middlewares/multer.middleware.js";
import {
  createPost,
  createRepost,
  deletePost,
  getAllFollowingPosts,
  getAllUserPosts,
  getSinglePost,
  quoteOnPost,
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
  .get(verifyJWT, verifyUser, getAllUserPosts)
  .post(
    verifyJWT,
    verifyUser,
    upload.fields([
      { name: "images", maxCount: 10 },
      { name: "videos", maxCount: 5 },
    ]),
    createPost
  );

router.route("/following").get(verifyJWT, verifyUser, getAllFollowingPosts);
router.route("/:postid/get").get(verifyJWT, verifyUser, getSinglePost);
router.route("/:postid/update").patch(verifyJWT, verifyUser, updatePost);
router.route("/:postid/delete").delete(verifyJWT, verifyUser, deletePost);
router.route("/:postid/reaction").get(verifyJWT, verifyUser, reactionOnPost);
router.route("/:postid/quote").post(verifyJWT, verifyUser, quoteOnPost);
router.route("/:postid/repost").get(verifyJWT, verifyUser, createRepost);

// Export Section
export default router;
