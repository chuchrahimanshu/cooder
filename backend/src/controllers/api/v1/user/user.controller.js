// Import Section
import {
  CLOUDINARY_USER_AVATAR,
  CLOUDINARY_USER_COVER,
} from "../../../../constants.js";
import { User } from "../../../../models/index.js";
import {
  asyncHandler,
  APIResponse,
  APIError,
  uploadMediaToCloudinary,
} from "../../../../utils/index.js";
import { deleteMediaFromCloudinary } from "../../../../utils/mediaHandler.util.js";

// Controller Actions - End Points
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  return res.status(200).json(
    new APIResponse(200, "Users fetched successfully.", {
      users,
    })
  );
});

export const getSingleUser = asyncHandler(async (req, res, next) => {});

export const updateUser = asyncHandler(async (req, res, next) => {
  const { userid } = req.params;
  const { firstName, lastName } = req.body;
  const { avatar, cover } = req.files;

  if (!firstName?.trim() || !lastName?.trim()) {
    return res
      .status(400)
      .json(new APIError(400, "Firstname and Lastname cannot be empty"));
  }

  if (
    !firstName?.trim() &&
    !lastName?.trim() &&
    !avatar?.trim() &&
    !cover?.trim()
  ) {
    return res.status(400).json(new APIError(400, "Nothing to update!"));
  }

  const user = await User.findById(userid);

  if (!user) {
    return res.status(404).json(new APIError(404, "User not found!"));
  }

  if (avatar) {
    const imageLocalPath = avatar.path;
    const { secure_url, public_id } = await uploadMediaToCloudinary(
      imageLocalPath,
      CLOUDINARY_USER_AVATAR
    );

    if (user.avatar?.public_id !== "DEFAULT AVATAR") {
      await deleteMediaFromCloudinary(user.avatar.public_id, "image");
    }

    user.avatar = {
      public_id: public_id,
      url: secure_url,
    };
    await user.save();
  }

  if (cover) {
    const imageLocalPath = cover.path;
    const { secure_url, public_id } = await uploadMediaToCloudinary(
      imageLocalPath,
      CLOUDINARY_USER_COVER
    );

    if (user.cover?.public_id !== "DEFAULT COVER") {
      await deleteMediaFromCloudinary(user.cover.public_id, "image");
    }

    user.cover = {
      public_id: public_id,
      url: secure_url,
    };
    await user.save();
  }

  user.firstName = firstName;
  user.lastName = lastName;
  await user.save();

  return res
    .status(200)
    .json(new APIResponse(200, "User updated successfully"));
});

export const deleteUser = asyncHandler(async (req, res, next) => {});
