// Import Section
import { Follow } from "../../../../../models/follow/follow.model.js";
import { asyncHandler } from "../../../../../utils/asyncHandler.util.js";
import { APIResponse } from "../../../../../utils/index.js";
import mongoose from "mongoose";

// Controller Actions - End Points
export const makeFollower = asyncHandler(async (req, res, next) => {
  const { userid, followid } = req.params;

  if (userid === followid) {
    return res
      .status(200)
      .json(new APIResponse(200, "User id and follow id cannot be same"));
  }

  const alreadyFollower = await Follow.aggregate([
    {
      $match: {
        $and: [
          {
            follower: {
              $eq: new mongoose.Types.ObjectId(userid),
            },
          },
          {
            following: {
              $eq: new mongoose.Types.ObjectId(followid),
            },
          },
        ],
      },
    },
  ]);

  if (alreadyFollower?.length > 0) {
    await Follow.findByIdAndDelete(alreadyFollower[0]._id);
    return res.status(200).json(
      new APIResponse(200, "User unfollowed successfully", {
        alreadyFollower,
      })
    );
  }

  await Follow.create({
    follower: userid,
    following: followid,
  });

  return res.status(200).json(
    new APIResponse(200, "User followed successfully", {
      alreadyFollower,
    })
  );
});
