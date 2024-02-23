// Import Section
import { User } from "../../../../models/user/user.model.js";
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

  return res.status(200).json(
    new APIResponse(200, "User is Signed In", {
      isAuthenticated: true,
    })
  );
});

export const verifyNewUser = asyncHandler(async (req, res, next) => {
  /*
  ALGORITHM: 

        1. Destructure { email } from req.body
        2. Validate that email is not empty / correct email.
        3. if empty, return error
        4. if present, get user using email
        5. Check the returned user is empty or not
        6. if empty, return response as new user
        7. if present, return response as user already exists
        
        Response Data - { existingUser: false || true }
        */

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
  /*
      ALGORITHM:

        1. Destructure { username } from req.body
        2. Validate that username is not empty / validate username
        3. if not correct, return error
        4. if correct, get user using username
        5. Check the returned user is empty or not
        6. if empty, return response as unique username
        7. if present, return response as username already taken

        Response Data - { uniqueUsername: false || true }
  */

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
  /*
      ALGORITHM:

        1. Destructure { firstName, lastName, email, username, password } from req.body
        2. Validate that all fields are containing value
        3. if any empty, return error
        4. if all present, get user using username
        5. Check the returned user is empty or not
        6. if present, return error
        7. if empty, get user using email
        8. if present, return error
        9. if empty, check all password validations
        10. if not passed, return error
        11. if passed, get user-agents from "ua-parser-js"
        12. create new user
        13. generate accessToken and refreshTokens for user
        14. set all tokens to cookies
        15. return response

        Response Data - { user }
  */

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

  // TODO: Make a check on to send only required details of user to frontend
  return res
    .status(201)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(
      new APIResponse(201, "User Signed Up Successfully", {
        user,
      })
    );
});

export const userSignIn = asyncHandler(async (req, res, next) => {
  /*
      ALGORITHM:

        1. Destructure { username, password } from req.body
        2. Validate that all fields are containing value
        3. if any empty, return error
        4. if all present, get user using username
        5. Check the returned user is empty or not
        6. if empty, return error
        7. if present, compare password using bcryptjs
        8. if not correct, return error
        9. if correct, verity the user agents
        10. if new agents, send an email having OTP
        11. save the otp to database
        12. return response to trigger two factor auth to verify OTP
        13. if existing, check two factor is enabled or disabled
        14. if enabled, send an email having OTP
        15. save the otp to database
        16. return response to trigger two factor auth to verify OTP
        17. if disabled, generate accessToken and refreshTokens for user
        18. set all tokens to cookies
        19. return response
        
        Response Data - { user }
        TODO: Make a check on to send only required details of user to frontend
  */

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

  // TODO: Make a check on to send only required details of user to frontend
  return res
    .status(200)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(
      new APIResponse(200, "User Signed In Successfully", {
        user,
      })
    );
});

export const userSignOut = asyncHandler(async (req, res, next) => {
  /*
      ALGORITHM:

        1. Get user from req.user
        2. Fetch user from database using user._id
        3. Update user refreshToken to null
        4. Save the user
        5. Clear all token cookies
        6. return response

        Response Data - {} - Empty data
  */

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
    /*
        ALGORITHM:

          1. Destructure { username } from req.body
          2. Validate that username is not empty
          3. if empty, return error
          4. if not empty, get user from database using username
          5. Check the returned user is empty or not
          6. if empty, return error
          7. if not empty, send an OTP on user's email
          8. save the otp to database
          9. return response

          Response Data - {} - Empty data
    */

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
    /*
        ALGORITHM:

          1. Destructure { username, otp, password } from req.body
          2. Validate that all fields are not empty
          3. if empty, return error
          4. if not empty, get user from database using username
          5. Check the returned user is empty or not
          6. if empty, return error
          7. if not empty, verify the otp is correct
          8. if not correct, return error
          9. if correct, check all password validations
          10. if correct, remove otp from database
          11. change the password and save user details
          12. return response 

          Response Data - {} - Empty data
    */

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
    /*
        ALGORITHM:

          1. Destructure { email } from req.body
          2. Validate that email is not empty
          3. if empty, return error
          4. if not empty, get user from database using email
          5. Check the returned user is empty or not
          6. if empty, return error
          7. if not empty, send an OTP on user's email
          8. save the otp to database
          9. return response

          Response Data - {} - Empty data
    */

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
    /*
        ALGORITHM:

          1. Destructure { otp, email } from req.body
          2. Validate that all fields are empty or not
          3. if empty, return error
          4. if not empty, get user from database using email
          5. Check the returned user is empty or not
          6. if empty, return error
          7. if not empty, compare otp are valid or not
          8. if not valid, return error
          9. if valid, delete otp from database
          10. save the user details
          11. return response

          Response Data - { tfaVerified: true || false }
    */

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

    // TODO: Make a check on to send only required details of user to frontend
    return res
      .status(200)
      .cookie("accessToken", accessToken, COOKIE_OPTIONS)
      .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
      .json(
        new APIResponse(200, "User Signed In Successfully", {
          user,
        })
      );
  }
);

export const generateEmailVerificationToken = asyncHandler(
  async (req, res, next) => {
    /*
        ALGORITHM:

          1. Get user from req.user
          2. send an email verification OTP on user's email
          3. save the otp to database
          4. return response

          Response Data - {} - Empty data
    */
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
    /*
        ALGORITHM:

          1. Destructure { otp } from req.body
          2. Validate the otp is not empty
          3. if empty, return error
          4. if not empty, Get user from database using req.user._id
          5. check otp is valid or not
          6. if not valid, return error
          7. if valid, remove otp from database
          8. update isVerified to true
          9. save the user details
          10. return response
    */

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
