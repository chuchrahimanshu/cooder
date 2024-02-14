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
  checkUserSignedIn,
} from "../../../../controllers/api/v1/index.js";
import { verifyJWT } from "../../../../middlewares/auth.middleware.js";
import { getUserAgent } from "../../../../middlewares/userAgent.middleware.js";

// Configuration Section
const router = express.Router();

// Non - Authenticated Routes Section
router.route("/").get(checkUserSignedIn).post(verifyNewUser);
router.route("/verify/:username").get(verifyUsername);
router.route("/sign-up").post(getUserAgent, userSignUp);
router.route("/sign-in").post(getUserAgent, userSignIn);
router
  .route("/change-password/:username")
  .get(generateChangePasswordToken)
  .patch(verifyTokenAndChangePassword);
router
  .route("/tfa/:username")
  .get(generateTwoFactorVerificationToken)
  .post(getUserAgent, verifyTwoFactorVerification);

// Authenticated Routes Section
router.route("/sign-out").get(verifyJWT, userSignOut);

// TODO: Move Email-Verification to User Module
router
  .route("/email-verification")
  .get(verifyJWT, generateEmailVerificationToken)
  .post(verifyJWT, verifyEmailVerificationToken);

// Export Section
export default router;
