// Import Section
import { Follow } from "../../../../../models/follow/follow.model.js";
import { User } from "../../../../../models/user/user.model.js";
import { asyncHandler } from "../../../../../utils/asyncHandler.util.js";
import { APIError, APIResponse } from "../../../../../utils/index.js";
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

export const userFollowDetails = asyncHandler(async (req, res, next) => {
  const { userid } = req.params;

  const users = await User.aggregate([
    {
      $match: {
        _id: {
          $ne: new mongoose.Types.ObjectId(userid),
        },
      },
    },
    {
      $lookup: {
        from: "follows",
        localField: "_id",
        foreignField: "following",
        as: "followers",
      },
    },
    {
      $lookup: {
        from: "follows",
        localField: "_id",
        foreignField: "follower",
        as: "followings",
      },
    },
    {
      $addFields: {
        totalFollowers: {
          $size: "$followers",
        },
        isFollowing: {
          $cond: {
            if: { $in: [req.user?._id, "$followers.follower"] },
            then: true,
            else: false,
          },
        },
        isFollower: {
          $cond: {
            if: { $in: [req.user?._id, "$followings.following"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        username: 1,
        avatar: 1,
        isFollowing: 1,
        isFollower: 1,
      },
    },
  ]);

  return res.status(200).json(
    new APIResponse(200, "Users fetched", {
      users,
    })
  );
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

export const deleteFollower = asyncHandler(async (req, res, next) => {
  const { userid, followid } = req.params;

  if (userid === followid) {
    return res
      .status(200)
      .json(new APIResponse(200, "User id and follow id cannot be same"));
  }

  const follower = await Follow.aggregate([
    {
      $match: {
        $and: [
          {
            follower: {
              $eq: new mongoose.Types.ObjectId(followid),
            },
          },
          {
            following: {
              $eq: new mongoose.Types.ObjectId(userid),
            },
          },
        ],
      },
    },
  ]);

  if (!follower) {
    return res.status(400).json(new APIError(400, "Follower not found"));
  }

  await Follow.findByIdAndDelete(follower[0]._id);

  return res
    .status(200)
    .json(new APIResponse(200, "Follower deleted successfully"));
});

export const deleteFollowing = asyncHandler(async (req, res, next) => {
  const { userid, followid } = req.params;

  if (userid === followid) {
    return res
      .status(200)
      .json(new APIResponse(200, "User id and follow id cannot be same"));
  }

  const following = await Follow.aggregate([
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

  if (!following) {
    return res.status(400).json(new APIError(400, "Following not found"));
  }

  await Follow.findByIdAndDelete(following[0]._id);

  return res
    .status(200)
    .json(new APIResponse(200, "Following deleted successfully"));
});

export const getFollowRequests = asyncHandler(async (req, res, next) => {
  const { userid } = req.params;

  const followRequests = await User.aggregate([
    {
      $match: {
        _id: {
          $eq: new mongoose.Types.ObjectId(userid),
        },
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "followRequest",
        as: "followRequest",
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
      $project: {
        followRequest: 1,
      },
    },
  ]);

  return res.status(200).json(
    new APIResponse(200, "Follow Requests Fetched Successfully", {
      followRequests: followRequests[0].followRequest,
    })
  );
});

export const pushFollowRequest = asyncHandler(async (req, res, next) => {
  const { userid, followid } = req.params;

  const followUser = await User.findById(followid);

  if (!followUser.followRequest.includes(userid)) {
    followUser.followRequest.push(userid);
    await followUser.save();
  }

  return res.status(200).json(new APIResponse(200, "Request Added"));
});
