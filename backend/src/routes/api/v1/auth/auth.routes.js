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
  verifyUsername,
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
router.route("/verify/username").post(verifyUsername);
router.route("/sign-up").post(getUserAgent, userSignUp);
router.route("/sign-in").post(getUserAgent, userSignIn);
router.route("/tokens/email").post(generateChangePasswordToken);
router.route("/change-password").patch(verifyTokenAndChangePassword);
router.route("/tokens/tfa").post(generateTwoFactorVerificationToken);
router.route("/verify/tfa").post(verifyTwoFactorVerification);

// Authenticated Routes Section
router.route("/sign-out").get(verifyJWT, userSignOut);
router.route("/tokens/email").get(verifyJWT, generateEmailVerificationToken);
router.route("/verify/email").post(verifyJWT, verifyEmailVerificationToken);

// Export Section
export default router;
