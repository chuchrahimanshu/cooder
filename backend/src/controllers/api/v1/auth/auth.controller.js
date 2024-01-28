// Import Section
import { asyncHandler } from "../../../../utils/asyncHandler.util.js";

// Controller Actions - End Points
export const verifyNewUser = asyncHandler(async (req, res, next) => {});

export const userSignUp = asyncHandler(async (req, res, next) => {});

export const userSignIn = asyncHandler(async (req, res, next) => {});

export const userSignOut = asyncHandler(async (req, res, next) => {});

export const verifyUniqueUsername = asyncHandler(async (req, res, next) => {});

export const generateChangePasswordToken = asyncHandler(
  async (req, res, next) => {}
);

export const verifyTokenAndChangePassword = asyncHandler(
  async (req, res, next) => {}
);

export const generateEmailVerificationToken = asyncHandler(
  async (req, res, next) => {}
);

export const verifyEmailVerificationToken = asyncHandler(
  async (req, res, next) => {}
);

export const generateTwoFactorVerificationToken = asyncHandler(
  async (req, res, next) => {}
);

export const verifyTwoFactorVerification = asyncHandler(
  async (req, res, next) => {}
);
