// Import Section
import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { User } from "../../../../models/index.js";
import {
  asyncHandler,
  APIError,
  APIResponse,
  sendEmail,
  generateRandomOTP,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../../../utils/index.js";
import {
  COOKIE_OPTIONS,
  SIGN_UP_EMAIL_SUBJECT,
  TFA_EMAIL_HBS,
  TFA_EMAIL_SUBJECT,
} from "../../../../constants.js";

// Configuration Section
const googleClient = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

// Controller Actions - End Points
export const checkUserSignedIn = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken && !refreshToken) {
    return res.status(401).json(
      new APIError(401, "Session expired, please sign in.", {
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
      return res
        .status(404)
        .json(
          new APIError(404, "Account not found. Please verify credentials.")
        );
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
    new APIResponse(200, "User authenticated successfully.", {
      isAuthenticated: true,
    })
  );
});

export const verifyNewUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email?.trim() || !validateEmail(email)) {
    return res
      .status(400)
      .json(new APIError(400, "Please provide a valid email address."));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(200).json(
      new APIResponse(200, "Unique user found, can proceed to sign up.", {
        existingUser: false,
      })
    );
  }

  return res.status(200).json(
    new APIResponse(200, "User already exists, please sign in.", {
      existingUser: true,
    })
  );
});

export const verifyUsername = asyncHandler(async (req, res, next) => {
  const { username } = req.params;
  if (!username?.trim() || !validateUsername(username.toLowerCase())) {
    return res
      .status(400)
      .json(new APIError(400, "Please provide a valid username."));
  }

  const user = await User.findOne({ username: username.toLowerCase() });
  if (user) {
    return res.status(200).json(
      new APIResponse(200, "Username is already taken.", {
        uniqueUsername: false,
      })
    );
  }

  return res.status(200).json(
    new APIResponse(200, "Unique username found!", {
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
      .json(new APIError(400, "Please provide all required fields."));
  }

  if (!validateEmail(email)) {
    return res
      .status(400)
      .json(new APIError(400, "Please provide a valid email address."));
  }

  if (!validateUsername(username.toLowerCase())) {
    return res
      .status(400)
      .json(new APIError(400, "Please provide a valid username."));
  }

  if (!validatePassword(password)) {
    return res
      .status(400)
      .json(new APIError(400, "Please provide a valid password."));
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res
      .status(409)
      .json(new APIError(409, "User already exists, please sign in."));
  }

  const existingUsername = await User.findOne({
    username: username.toLowerCase(),
  });
  if (existingUsername) {
    return res
      .status(400)
      .json(new APIError(400, "Username is already taken."));
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
    TFA_EMAIL_HBS,
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
        followRequested: 1,
      },
    },
  ]);

  return res
    .status(201)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(
      new APIResponse(201, "User signed up successfully.", {
        user: userDetails[0],
      })
    );
});

export const userSignIn = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username?.trim() || !password?.trim()) {
    return res
      .status(400)
      .json(new APIError(400, "Please provide all required fields"));
  }

  const user = await User.findOne({ username: username.toLowerCase() });
  if (!user) {
    return res
      .status(401)
      .json(new APIError(401, "Invalid username/password."));
  }

  const validPassword = await user.isPasswordCorrect(password);
  if (!validPassword) {
    return res
      .status(401)
      .json(new APIError(401, "Invalid username/password."));
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
      new APIResponse(200, "OTP sent successfully. Please check your email.", {
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
        followRequested: 1,
      },
    },
  ]);

  return res
    .status(200)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(
      new APIResponse(200, "User signed in successfully.", {
        user: userDetails[0],
      })
    );
});

export const userSignOut = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user?._id);
  if (!user) {
    return res
      .status(404)
      .json(new APIError(404, "Account not found. Please verify credentials."));
  }

  user.refreshToken = null;
  await user.save();

  return res
    .status(200)
    .clearCookie("accessToken", COOKIE_OPTIONS)
    .clearCookie("refreshToken", COOKIE_OPTIONS)
    .json(new APIResponse(200, "User signed out successfully."));
});

export const generateChangePasswordToken = asyncHandler(
  async (req, res, next) => {
    const { username } = req.params;
    if (!username?.trim()) {
      return res
        .status(400)
        .json(new APIError(400, "Please provide a valid username."));
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res
        .status(404)
        .json(
          new APIError(404, "Account not found. Please verify credentials.")
        );
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
      .json(
        new APIResponse(200, "OTP sent successfully. Please check your email.")
      );
  }
);

export const verifyTokenAndChangePassword = asyncHandler(
  async (req, res, next) => {
    const { otp, password } = req.body;
    const { username } = req.params;
    if (!username?.trim() || !otp?.trim() || !password?.trim()) {
      return res
        .status(400)
        .json(new APIError(400, "Please provide all required fields."));
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res
        .status(404)
        .json(
          new APIError(404, "Account not found. Please verify credentials.")
        );
    }

    if (user.passwordVerification?.toString() !== otp.toString()) {
      return res
        .status(401)
        .json(new APIError(401, "Incorrect OTP. Please try again."));
    }

    if (!validatePassword(password)) {
      return res
        .status(400)
        .json(new APIError(400, "Please provide a valid password."));
    }

    user.password = password;
    user.passwordVerification = null;
    await user.save();

    return res
      .status(200)
      .json(new APIResponse(200, "Password updated successfully."));
  }
);

export const generateTwoFactorVerificationToken = asyncHandler(
  async (req, res, next) => {
    const { username } = req.params;
    if (!username?.trim()) {
      return res
        .status(400)
        .json(new APIError(400, "Please provide a valid username."));
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res
        .status(404)
        .json(
          new APIError(404, "Account not found. Please verify credentials.")
        );
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
      .json(
        new APIResponse(200, "OTP sent successfully. Please check your email.")
      );
  }
);

export const verifyTwoFactorVerification = asyncHandler(
  async (req, res, next) => {
    const { otp } = req.body;
    const { username } = req.params;
    if (!otp?.trim() || !username?.trim()) {
      return res
        .status(400)
        .json(new APIError(400, "Please provide all required fields."));
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res
        .status(404)
        .json(
          new APIError(404, "Account not found. Please verify credentials.")
        );
    }

    if (user.twoFactorVerification?.toString() !== otp.toString()) {
      return res
        .status(401)
        .json(new APIError(401, "Incorrect OTP. Please try again."));
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
          followRequested: 1,
        },
      },
    ]);

    return res
      .status(200)
      .cookie("accessToken", accessToken, COOKIE_OPTIONS)
      .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
      .json(
        new APIResponse(200, "User signed in successfully.", {
          user: userDetails[0],
        })
      );
  }
);

export const generateEmailVerificationToken = asyncHandler(
  async (req, res, next) => {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res
        .status(404)
        .json(
          new APIError(404, "Account not found. Please verify credentials.")
        );
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
      .json(
        new APIResponse(200, "OTP sent successfully. Please check your email.")
      );
  }
);

export const verifyEmailVerificationToken = asyncHandler(
  async (req, res, next) => {
    const { otp } = req.body;
    if (!otp?.trim()) {
      return res
        .status(401)
        .json(new APIError(401, "Incorrect OTP. Please try again."));
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
      return res
        .status(404)
        .json(
          new APIError(404, "Account not found. Please verify credentials.")
        );
    }

    if (user.emailVerification?.toString() !== otp.toString()) {
      return res
        .status(401)
        .json(new APIError(401, "Incorrect OTP. Please try again."));
    }

    user.isEmailVerified = true;
    user.emailVerification = null;
    await user.save();

    return res
      .status(200)
      .json(new APIResponse(200, "Email verified successfully."));
  }
);

export const chooseUsername = asyncHandler(async (req, res, next) => {
  const { username } = req.body;
  if (!username.trim()) {
    return res
      .status(400)
      .json(new APIError(400, "Please provide a valid username."));
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res
      .status(404)
      .json(new APIError(404, "Account not found. Please verify credentials."));
  }

  if (!validateUsername(username.toLowerCase())) {
    return res
      .status(400)
      .json(new APIError(400, "Please provide a valid username."));
  }

  const existingUsername = await User.findOne({
    username: username.toLowerCase(),
  });
  if (existingUsername) {
    return res.status(400).json(new APIError(400, "Username already taken."));
  }

  user.username = username;
  await user.save();

  return res
    .status(200)
    .json(new APIResponse(200, "Username assigned successfully."));
});

export const getUserDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user?._id);
  if (!user) {
    return res
      .status(404)
      .json(new APIError(404, "Account not found. Please verify credentials."));
  }

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
        followRequested: 1,
      },
    },
  ]);

  return res.status(200).json(
    new APIResponse(200, "User details fetched successfully.", {
      user: userDetails[0],
    })
  );
});

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
          followRequested: 1,
        },
      },
    ]);

    return res
      .status(201)
      .cookie("accessToken", accessToken, COOKIE_OPTIONS)
      .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
      .json(
        new APIResponse(201, "User signed in successfully.", {
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
        followRequested: 1,
      },
    },
  ]);

  return res
    .status(200)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(
      new APIResponse(200, "User signed in successfully.", {
        user: userDetails[0],
        newUser: false,
      })
    );
});
