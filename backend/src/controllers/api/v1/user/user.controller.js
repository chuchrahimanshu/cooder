// Import Section
import { User } from "../../../../models/user/user.model.js";
import { asyncHandler } from "../../../../utils/asyncHandler.util.js";
import { APIError } from "../../../../utils/errorHandler.util.js";
import { APIResponse } from "../../../../utils/responseHandler.util.js";

// Controller Actions - End Points

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  return res.status(200).json(
    new APIResponse(200, "All users fetched successfully", {
      size: users.length,
      users,
    })
  );
});

export const getSingleUser = asyncHandler(async (req, res, next) => {
  if (req.params?.id?.toString() !== req.user?._id?.toString()) {
    return res.status(401).json(new APIError(401, "Unauthorized Access"));
  }

  const user = await User.findById(req.user?._id);
  if (!user) {
    return res.status(401).json(new APIError(401, "Unauthorized Access"));
  }

  return res.status(200).json(
    new APIResponse(200, "User details fetched successfully", {
      user,
    })
  );
});

export const updateUser = asyncHandler(async (req, res, next) => {});

export const deleteUser = asyncHandler(async (req, res, next) => {});
