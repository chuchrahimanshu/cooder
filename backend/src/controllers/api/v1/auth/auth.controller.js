// Import Section
import { User } from "../../../../models/user/user.model.js";
import JWT from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { asyncHandler } from "../../../../utils/asyncHandler.util.js";
import { APIError } from "../../../../utils/errorHandler.util.js";
import { APIResponse } from "../../../../utils/responseHandler.util.js";
import { sendEmail } from "../../../../utils/emailHandler.util.js";
import {
  CHANGE_PASSWORD_EMAIL_HBS,
  CHANGE_PASSWORD_EMAIL_SUBJECT,
  COOKIE_OPTIONS,
  EMAIL_VERIFICATION_EMAIL_HBS,
  EMAIL_VERIFICATION_EMAIL_SUBJECT,
  SIGN_UP_EMAIL_HBS,
  SIGN_UP_EMAIL_SUBJECT,
  TFA_EMAIL_HBS,
  TFA_EMAIL_SUBJECT,
} from "../../../../constants.js";
import {
  generateRandomOTP,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../../../utils/helper.util.js";
import mongoose from "mongoose";

// Configuration Section
const googleClient = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

// Controller Actions - End Points

export const checkUserSignedIn = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken && !refreshToken) {
    return res.status(400).json(
      new APIError(400, "Session Expired, Please Sign - In", {
        isAuthenticated: false,
      })
    );
  }

  if (!accessToken && refreshToken) {
    const decodedRefreshToken = JWT.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedRefreshToken?._id);

    if (!user) {
      return res.status(401).json(new APIError(401, "Unauthorized Access"));
    }

    const newAccessToken = await user.generateAccessToken();
    const newRefreshToken = await user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save();
    res
      .cookie("accessToken", newAccessToken, COOKIE_OPTIONS)
      .cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);

    req.user = user;
  }

  return res.status(200).json(
    new APIResponse(200, "User is Signed In", {
      isAuthenticated: true,
    })
  );
});

export const verifyNewUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email?.trim() || !validateEmail(email)) {
    return res
      .status(400)
      .json(new APIError(400, "Please enter a valid email address"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(200).json(
      new APIResponse(200, "Unique Email Address", {
        existingUser: false,
      })
    );
  }

  return res.status(200).json(
    new APIResponse(200, "Email already exists, Please Sign In", {
      existingUser: true,
    })
  );
});

export const verifyUsername = asyncHandler(async (req, res, next) => {
  const { username } = req.params;
  if (!username?.trim() || !validateUsername(username.toLowerCase())) {
    return res
      .status(400)
      .json(new APIError(400, "Please enter a valid username"));
  }

  const user = await User.findOne({ username: username.toLowerCase() });
  if (user) {
    return res.status(200).json(
      new APIResponse(200, "Username already taken", {
        uniqueUsername: false,
      })
    );
  }

  return res.status(200).json(
    new APIResponse(200, "Unique username", {
      uniqueUsername: true,
    })
  );
});

export const userSignUp = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, username, password } = req.body;
  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !username?.trim() ||
    !password?.trim()
  ) {
    return res
      .status(400)
      .json(new APIError(400, "Please enter all required fields"));
  }

  if (!validateEmail(email)) {
    return res
      .status(400)
      .json(new APIError(400, "Please enter a valid email address"));
  }

  if (!validateUsername(username.toLowerCase())) {
    return res
      .status(400)
      .json(new APIError(400, "Please enter a valid username"));
  }

  if (!validatePassword(password)) {
    return res
      .status(400)
      .json(new APIError(400, "Please enter a valid password"));
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res
      .status(400)
      .json(new APIError(400, "Email already exists, Please Sign In"));
  }

  const existingUsername = await User.findOne({
    username: username.toLowerCase(),
  });
  if (existingUsername) {
    return res.status(400).json(new APIError(400, "Username already taken"));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    username: username.toLowerCase(),
    password,
    userAgent: [req.userAgent],
  });

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  await sendEmail(
    user.email,
    SIGN_UP_EMAIL_SUBJECT,
    SIGN_UP_EMAIL_HBS,
    `${user.firstName} ${user.lastName}`
  );

  const userDetails = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(user._id),
      },
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        username: 1,
        email: 1,
        avatar: 1,
        cover: 1,
        isEmailVerified: 1,
      },
    },
  ]);

  return res
    .status(201)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(
      new APIResponse(201, "User Signed Up Successfully", {
        user: userDetails[0],
      })
    );
});

export const userSignIn = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username?.trim() || !password?.trim()) {
    return res
      .status(400)
      .json(new APIError(400, "Please enter all required fields"));
  }

  const user = await User.findOne({ username: username.toLowerCase() });
  if (!user) {
    return res.status(400).json(new APIError(400, "Invalid Username/Password"));
  }

  const validPassword = await user.isPasswordCorrect(password);
  if (!validPassword) {
    return res.status(400).json(new APIError(400, "Invalid Username/Password"));
  }

  const verifiedUserAgent = user.userAgent.includes(req.userAgent);

  if (!verifiedUserAgent || user.twoFactorVerification === true) {
    const OTP = generateRandomOTP();

    await sendEmail(
      user.email,
      TFA_EMAIL_SUBJECT,
      TFA_EMAIL_HBS,
      `${user.firstName} ${user.lastName}`,
      null,
      OTP
    );

    user.twoFactorVerification = OTP.toString();
    await user.save();

    return res.status(200).json(
      new APIResponse(200, "OTP sent on registered email", {
        tfaVerification: true,
      })
    );
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  const userDetails = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(user._id),
      },
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        username: 1,
        email: 1,
        avatar: 1,
        cover: 1,
        isEmailVerified: 1,
      },
    },
  ]);

  return res
    .status(200)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(
      new APIResponse(200, "User Signed In Successfully", {
        user: userDetails[0],
      })
    );
});

export const userSignOut = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user?._id);
  if (!user) {
    return res.status(401).json(new APIError(401, "Unauthorized Access"));
  }

  user.refreshToken = null;
  await user.save();

  return res
    .status(200)
    .clearCookie("accessToken", COOKIE_OPTIONS)
    .clearCookie("refreshToken", COOKIE_OPTIONS)
    .json(new APIResponse(200, "User Signed Out Successfully"));
});

export const generateChangePasswordToken = asyncHandler(
  async (req, res, next) => {
    const { username } = req.params;
    if (!username?.trim()) {
      return res
        .status(400)
        .json(new APIError(400, "Please enter a valid username"));
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res
        .status(400)
        .json(new APIError(400, "User not found, Please Sign Up"));
    }

    const OTP = generateRandomOTP();

    await sendEmail(
      user.email,
      TFA_EMAIL_SUBJECT,
      TFA_EMAIL_HBS,
      `${user.firstName} ${user.lastName}`,
      null,
      OTP
    );

    user.passwordVerification = OTP.toString();
    await user.save();

    return res
      .status(200)
      .json(new APIResponse(200, "OTP sent on registered email"));
  }
);

export const verifyTokenAndChangePassword = asyncHandler(
  async (req, res, next) => {
    const { otp, password } = req.body;
    const { username } = req.params;
    if (!username?.trim() || !otp?.trim() || !password?.trim()) {
      return res
        .status(400)
        .json(new APIError(400, "Please enter all required fields"));
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res
        .status(400)
        .json(new APIError(400, "User not found, Please Sign Up"));
    }

    if (user.passwordVerification?.toString() !== otp.toString()) {
      return res
        .status(400)
        .json(new APIError(400, "Please enter a valid OTP"));
    }

    if (!validatePassword(password)) {
      return res
        .status(400)
        .json(new APIError(400, "Please enter a valid password"));
    }

    user.password = password;
    user.passwordVerification = null;
    await user.save();

    return res
      .status(200)
      .json(new APIResponse(200, "Password Updated Successfully"));
  }
);

export const generateTwoFactorVerificationToken = asyncHandler(
  async (req, res, next) => {
    const { username } = req.params;
    if (!username?.trim()) {
      return res
        .status(400)
        .json(new APIError(400, "Please enter a valid username"));
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res
        .status(400)
        .json(new APIError(400, "User not found, Please Sign Up"));
    }

    const OTP = generateRandomOTP();

    await sendEmail(
      user.email,
      TFA_EMAIL_SUBJECT,
      TFA_EMAIL_HBS,
      `${user.firstName} ${user.lastName}`,
      null,
      OTP
    );

    user.twoFactorVerification = OTP.toString();
    await user.save();

    return res
      .status(200)
      .json(new APIResponse(200, "OTP sent on registered email"));
  }
);

export const verifyTwoFactorVerification = asyncHandler(
  async (req, res, next) => {
    const { otp } = req.body;
    const { username } = req.params;
    if (!otp?.trim() || !username?.trim()) {
      return res
        .status(400)
        .json(new APIError(400, "Please enter all required fields"));
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res
        .status(400)
        .json(new APIError(400, "User not found, Please Sign Up"));
    }

    if (user.twoFactorVerification?.toString() !== otp.toString()) {
      return res
        .status(400)
        .json(new APIError(400, "Please enter a valid OTP"));
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.twoFactorVerification = null;
    user.refreshToken = refreshToken;
    user.userAgent.push(req.userAgent);
    await user.save();

    const userDetails = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(user._id),
        },
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          username: 1,
          email: 1,
          avatar: 1,
          cover: 1,
          isEmailVerified: 1,
        },
      },
    ]);

    return res
      .status(200)
      .cookie("accessToken", accessToken, COOKIE_OPTIONS)
      .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
      .json(
        new APIResponse(200, "User Signed In Successfully", {
          user: userDetails[0],
        })
      );
  }
);

export const generateEmailVerificationToken = asyncHandler(
  async (req, res, next) => {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(401).json(new APIError(401, "Unauthorized Access"));
    }

    const OTP = generateRandomOTP();

    await sendEmail(
      user.email,
      TFA_EMAIL_SUBJECT,
      TFA_EMAIL_HBS,
      `${user.firstName} ${user.lastName}`,
      null,
      OTP
    );

    user.emailVerification = OTP.toString();
    await user.save();

    return res
      .status(200)
      .json(new APIResponse(200, "OTP sent on registered email"));
  }
);

export const verifyEmailVerificationToken = asyncHandler(
  async (req, res, next) => {
    const { otp } = req.body;
    if (!otp?.trim()) {
      return res
        .status(400)
        .json(new APIError(400, "Please enter a valid OTP"));
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(401).json(new APIError(401, "Unauthorized Access"));
    }

    if (user.emailVerification?.toString() !== otp.toString()) {
      return res
        .status(400)
        .json(new APIError(400, "Please enter a valid OTP"));
    }

    user.isEmailVerified = true;
    user.emailVerification = null;
    await user.save();

    return res
      .status(200)
      .json(new APIResponse(200, "Email Verified Successfully"));
  }
);

export const authUsingGoogle = asyncHandler(async (req, res, next) => {
  const { credential } = req.body;
  const ticket = await googleClient.verifyIdToken({
    idToken: credential.credential,
    audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const { sub, email, email_verified, name, picture, given_name, family_name } =
    payload;

  const existingUser = await User.findOne({ email: email });
  if (!existingUser) {
    const password = sub + Date.now();
    const user = await User.create({
      firstName: given_name ? given_name : name,
      lastName: family_name ? family_name : name,
      email: email,
      username: Date.now(),
      password: password,
      isEmailVerified: email_verified,
      avatar: picture,
      userAgent: [req.userAgent],
    });

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    const userDetails = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(user._id),
        },
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          username: 1,
          email: 1,
          avatar: 1,
          cover: 1,
          isEmailVerified: 1,
        },
      },
    ]);

    return res
      .status(200)
      .cookie("accessToken", accessToken, COOKIE_OPTIONS)
      .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
      .json(
        new APIResponse(200, "User Signed Up Successfully", {
          user: userDetails[0],
          newUser: true,
        })
      );
  }

  const accessToken = await existingUser.generateAccessToken();
  const refreshToken = await existingUser.generateRefreshToken();

  existingUser.refreshToken = refreshToken;
  await existingUser.save();

  const userDetails = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(existingUser._id),
      },
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        username: 1,
        email: 1,
        avatar: 1,
        cover: 1,
        isEmailVerified: 1,
      },
    },
  ]);

  return res
    .status(200)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(
      new APIResponse(200, "User Signed In Successfully", {
        user: userDetails[0],
        newUser: false,
      })
    );
});

export const chooseUsername = asyncHandler(async (req, res, next) => {
  const { username } = req.body;
  if (!username.trim()) {
    return res
      .status(400)
      .json(new APIError(400, "Please enter a valid username"));
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(400).json(new APIError(400, "Something went wrong"));
  }

  if (!validateUsername(username.toLowerCase())) {
    return res
      .status(400)
      .json(new APIError(400, "Please enter a valid username"));
  }

  const existingUsername = await User.findOne({
    username: username.toLowerCase(),
  });
  if (existingUsername) {
    return res.status(400).json(new APIError(400, "Username already taken"));
  }

  user.username = username;
  await user.save();

  return res
    .status(200)
    .json(new APIResponse(200, "Username changed Successfully"));
});
