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
  authUsingGoogle,
  chooseUsername,
  getUserDetails,
} from "../../../../controllers/api/v1/index.js";
import {
  verifyJWT,
  getUserAgent,
  verifyUser,
} from "../../../../middlewares/index.js";

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
router.route("/google/callback").post(getUserAgent, authUsingGoogle);

// Authenticated Routes Section
router.route("/sign-out").get(verifyJWT, userSignOut);
router.route("/choose-username").post(verifyJWT, chooseUsername);
router.route("/:userid/get").get(verifyJWT, verifyUser, getUserDetails);
router
  .route("/email-verification")
  .get(verifyJWT, generateEmailVerificationToken)
  .post(verifyJWT, verifyEmailVerificationToken);

// Export Section
export default router;
