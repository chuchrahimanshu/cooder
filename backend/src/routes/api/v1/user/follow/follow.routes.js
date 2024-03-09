// Import Section
import express from "express";
import {
  updateFollowRelation,
  userFollowDetails,
  getFollowers,
  getFollowing,
} from "../../../../../controllers/api/v1/index.js";
import { verifyJWT } from "../../../../../middlewares/auth.middleware.js";
import { verifyUser } from "../../../../../middlewares/user.middleware.js";

// Configuration Section
const router = express.Router({ mergeParams: true });

// Authenticated Routes Section
router
  .route("/relation/:followid")
  .get(verifyJWT, verifyUser, updateFollowRelation);
router.route("/followers").get(verifyJWT, verifyUser, getFollowers);
router.route("/following").get(verifyJWT, verifyUser, getFollowing);
router.route("/details").get(verifyJWT, verifyUser, userFollowDetails);

// Export Section
export default router;
