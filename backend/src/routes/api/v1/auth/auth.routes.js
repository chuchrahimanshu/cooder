// Import Section
import express from "express";
import {
  generateChangePasswordToken,
  generateEmailVerificationToken,
  generateTwoFactorVerificationToken,
  userSignIn,
  userSignOut,
  userSignUp,
  verifyNewUser,
  verifyUniqueUsername,
  verifyTokenAndChangePassword,
  verifyTwoFactorVerification,
  verifyEmailVerificationToken,
} from "../../../../controllers/api/v1/auth/auth.controller.js";
import { verifyJWT } from "../../../../middlewares/auth.middleware.js";
import { getUserAgent } from "../../../../middlewares/userAgent.middleware.js";

// Configuration Section
const router = express.Router();

// Non - Authenticated Routes Section
router.route("/").post(verifyNewUser);
router.route("/verify/username").post(verifyUniqueUsername);
router.route("/sign-up").post(getUserAgent, userSignUp);
router.route("/sign-in").post(getUserAgent, userSignIn);
router.route("/tokens/email").post(generateChangePasswordToken);
router.route("/change-password").patch(verifyTokenAndChangePassword);
router.route("/tokens/tfa").post(generateTwoFactorVerificationToken);
router.route("/verify/tfa").post(verifyTwoFactorVerification);

// Authenticated Routes Section
router.route(verifyJWT, "/sign-out").get(userSignOut);
router.route(verifyJWT, "/tokens/email").get(generateEmailVerificationToken);
router.route(verifyJWT, "/verify/email").post(verifyEmailVerificationToken);

// Export Section
export default router;
