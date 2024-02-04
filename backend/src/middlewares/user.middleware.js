import { APIError } from "../utils/errorHandler.util.js";

const verifyUser = async (req, res, next) => {
  const { userid } = req.params;

  if (req.user?._id.toString() !== userid.toString()) {
    return res.status(401).json(new APIError(401, "Unauthorized Access"));
  }

  next();
};

export { verifyUser };
