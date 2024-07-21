/*
  Middleware Usecases:

    1. Check user is authenticated or not using JWT tokens.
    2. If, both Access and Refresh tokens are not present then initiate an error.
    3. If, there is Refresh token then it generates both tokens and sign-in the user.
    4. If, both Access and Refresh tokens are present then it verify the tokens.

    **This middleware is used with every authenticated / protected route.

  This file contains 3 sections:

    1. Import Section
    2. verifyJWT - Middleware Function
    3. Export Section
*/

// Import Section
import JWT from "jsonwebtoken";
import { User } from "../models/index.js";
import { APIError } from "../utils/index.js";
import { COOKIE_OPTIONS } from "../constants.js";

// Verifying the user using JWT
const verifyJWT = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;
    console.log(req.cookies);
    console.log(accessToken);
    console.log(refreshToken);

    if (!accessToken && !refreshToken) {
      return res
        .status(401)
        .json(new APIError(401, "Session expired, please sign in."));
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

    if (accessToken) {
      const decodedAccessToken = JWT.verify(
        accessToken,
        process.env.JWT_ACCESS_TOKEN_SECRET
      );

      const user = await User.findById(decodedAccessToken?._id);

      if (!user) {
        return res
          .status(404)
          .json(
            new APIError(404, "Account not found. Please verify credentials.")
          );
      }
      req.user = user;
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json(new APIError(500, error?.message || "Unauthorized Access"));
  }
};

// Export Section
export { verifyJWT };
