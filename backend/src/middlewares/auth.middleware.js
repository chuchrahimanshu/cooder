import JWT from "jsonwebtoken";
import { User } from "../models/user/user.model.js";
import { APIError } from "../utils/errorHandler.util.js";
import { COOKIE_OPTIONS } from "../constants.js";

const verifyJWT = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    if (!accessToken && !refreshToken) {
      return res.status(401).json(new APIError(401, "Unauthorized Access"));
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

    if (accessToken) {
      const decodedAccessToken = JWT.verify(
        accessToken,
        process.env.JWT_ACCESS_TOKEN_SECRET
      );

      const user = await User.findById(decodedAccessToken?._id);

      if (!user) {
        return res.status(401).json(new APIError(401, "Unauthorized Access"));
      }
      req.user = user;
    }

    next();
  } catch (error) {
    return res
      .status(401)
      .json(new APIError(401, error?.message || "Unauthorized Access"));
  }
};

export { verifyJWT };
