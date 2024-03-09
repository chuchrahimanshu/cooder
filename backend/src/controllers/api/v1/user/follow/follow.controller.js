// Import Section
import { Follow } from "../../../../../models/follow/follow.model.js";
import { User } from "../../../../../models/user/user.model.js";
import { asyncHandler } from "../../../../../utils/asyncHandler.util.js";
import { APIResponse } from "../../../../../utils/index.js";
import mongoose from "mongoose";

// Controller Actions - End Points
export const updateFollowRelation = asyncHandler(async (req, res, next) => {
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

export const getUsersNotFollowing = asyncHandler(async (req, res, next) => {
  const { userid } = req.params;

  const users = await Follow.aggregate([
    {
      $match: {
        following: {
          $neq: {
            _id: new mongoose.Types.ObjectId(userid),
          },
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "following",
        foreignField: "_id",
        as: "notFollowingUsers",
        pipeline: [
          {
            $project: {
              firstName: 1,
              lastName: 1,
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
  ]);
});

export const getFollowers = asyncHandler(async (req, res, next) => {
  const { userid } = req.params;

  const followers = await Follow.aggregate([
    {
      $match: {
        following: {
          $eq: new mongoose.Types.ObjectId(userid),
        },
      },
    },
    {
      $project: {
        follower: 1,
        _id: 0,
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "follower",
        as: "follower",
        pipeline: [
          {
            $project: {
              firstName: 1,
              lastName: 1,
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        follower: {
          $first: "$follower",
        },
      },
    },
    {
      $project: {
        _id: "$follower._id",
        firstName: "$follower.firstName",
        lastName: "$follower.lastName",
        username: "$follower.username",
        avatar: "$follower.avatar",
      },
    },
  ]);

  res.status(200).json(
    new APIResponse(200, "Followers fetched successfully", {
      followers: followers,
    })
  );
});

export const getFollowing = asyncHandler(async (req, res, next) => {
  const { userid } = req.params;

  const following = await Follow.aggregate([
    {
      $match: {
        follower: {
          $eq: new mongoose.Types.ObjectId(userid),
        },
      },
    },
    {
      $project: {
        following: 1,
        _id: 0,
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "following",
        as: "following",
        pipeline: [
          {
            $project: {
              firstName: 1,
              lastName: 1,
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        following: {
          $first: "$following",
        },
      },
    },
    {
      $project: {
        _id: "$following._id",
        firstName: "$following.firstName",
        lastName: "$following.lastName",
        username: "$following.username",
        avatar: "$following.avatar",
      },
    },
  ]);

  res.status(200).json(
    new APIResponse(200, "Followings fetched successfully", {
      following,
    })
  );
});
