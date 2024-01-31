import { APIError } from "../utils/errorHandler.util.js";

const verifyUser = async (req, res, next) => {
  const { id } = req.params;

  if (req.user._id.toString() !== id.toString()) {
    return res.status(401).json(new APIError(401, "Unauthorized Access"));
  }

  next();
};

export { verifyUser };
