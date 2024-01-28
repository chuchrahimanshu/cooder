import JWT from "jsonwebtoken";
import { User } from "../models/user/user.model.js";
import { ErrorHandler } from "../utils/errorHandler.util.js";

const verifyJWT = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      throw new ErrorHandler(401, "Unauthorized Access");
    }

    const decodedAccessToken = JWT.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedAccessToken?._id);

    if (!user) {
      throw new ErrorHandler(401, "Unauthorized Access");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ErrorHandler(401, error?.message || "Unauthorized Access");
  }
};

export { verifyJWT };
