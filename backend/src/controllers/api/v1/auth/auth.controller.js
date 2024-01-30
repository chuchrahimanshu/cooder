// Import Section
import { User } from "../../../../models/user/user.model.js";
import { asyncHandler } from "../../../../utils/asyncHandler.util.js";
import { APIError } from "../../../../utils/errorHandler.util.js";
import { validateEmail } from "../../../../utils/helper.util.js";
import { APIResponse } from "../../../../utils/responseHandler.util.js";

// Controller Actions - End Points
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

  if (!email || !validateEmail(email)) {
    return res
      .status(400)
      .json(new APIError(400, "Please provide a valid email address"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(200).json(
      new APIResponse(200, "Unique username", {
        existingUser: false,
      })
    );
  }

  return res.status(200).json(
    new APIResponse(200, "Username already taken", {
      existingUser: true,
    })
  );
});

export const verifyUsername = asyncHandler(async (req, res, next) => {
  /*
      ALGORITHM:

        1. Destructure { username } from req.body
        2. Validate that username is not empty
        3. if empty, return error
        4. if present, validate username
        5. if not correct, return error
        6. if correct, get user using username
        7. Check the returned user is empty or not
        8. if empty, return response as unique username
        9. if present, return response as username already taken

        Response Data - { uniqueUsername: false || true }
  */
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
        TODO: Make a check on to send only required details of user to frontend
  */
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
  }
);
