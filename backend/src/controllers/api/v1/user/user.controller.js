// Import Section
import { User } from "../../../../models/user/user.model.js";
import { asyncHandler } from "../../../../utils/asyncHandler.util.js";
import { APIError } from "../../../../utils/errorHandler.util.js";
import { APIResponse } from "../../../../utils/responseHandler.util.js";

// Controller Actions - End Points

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  return res.status(200).json(
    new APIResponse(200, "Users fetched successfully", {
      users,
    })
  );
});

export const getSingleUser = asyncHandler(async (req, res, next) => {});

export const updateUser = asyncHandler(async (req, res, next) => {});

export const deleteUser = asyncHandler(async (req, res, next) => {});
