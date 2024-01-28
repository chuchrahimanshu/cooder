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
} from "../../../controllers/api/v1/auth.controller.js";

// Configuration Section
const router = express.Router();

// Non - Authenticated Routes Section
router.route("/").post(verifyNewUser);
router.route("/sign-up").post(userSignUp);
router.route("/sign-in").post(userSignIn);
router.route("/verify/username").post(verifyUniqueUsername);
router.route("/tokens/email").post(generateChangePasswordToken);
router.route("/change-password").post(verifyTokenAndChangePassword);
router.route("/tokens/tfa").post(generateTwoFactorVerificationToken);
router.route("/verify/tfa").post(verifyTwoFactorVerification);

// Authenticated Routes Section
router.route("/sign-out").get(userSignOut);
router.route("/tokens/email").get(generateEmailVerificationToken);
router.route("/verify/email").post(verifyEmailVerificationToken);

// Export Section
export default router;
