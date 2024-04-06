// Import Section
import express from "express";
import {
  userFollowRequests,
  createRequest,
  acceptRequest,
  rejectRequest,
  removeFollower,
  unfollowUser,
  notFollowingUsers,
  getFollowers,
  getFollowing,
} from "../../../../../controllers/api/v1/index.js";
import { verifyJWT, verifyUser } from "../../../../../middlewares/index.js";

// Configuration Section
const router = express.Router({ mergeParams: true });

// Authenticated Routes Section
router.route("/").get(verifyJWT, verifyUser, userFollowRequests);
router.route("/:followid/create").get(verifyJWT, verifyUser, createRequest);
router.route("/:followid/accept").get(verifyJWT, verifyUser, acceptRequest);
router.route("/:followid/reject").get(verifyJWT, verifyUser, rejectRequest);
router.route("/:followid/remove").delete(verifyJWT, verifyUser, removeFollower);
router.route("/:followid/unfollow").delete(verifyJWT, verifyUser, unfollowUser);
router.route("/followers").get(verifyJWT, verifyUser, getFollowers);
router.route("/following").get(verifyJWT, verifyUser, getFollowing);
router.route("/details").get(verifyJWT, verifyUser, notFollowingUsers);

// Export Section
export default router;
