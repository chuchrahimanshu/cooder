import { APIError } from "../utils/errorHandler.util.js";

const verifyUser = async (req, res, next) => {
  const { username } = req.params;

  if (req.user?.username.toString() !== username.toString()) {
    return res.status(401).json(new APIError(401, "Unauthorized Access"));
  }

  next();
};

export { verifyUser };
