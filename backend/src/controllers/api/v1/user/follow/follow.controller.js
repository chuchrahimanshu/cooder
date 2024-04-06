// Import Section
import mongoose from "mongoose";
import { User, Follow } from "../../../../../models/index.js";
import {
  APIError,
  APIResponse,
  asyncHandler,
} from "../../../../../utils/index.js";

// Controller Actions - End Points
export const userFollowRequests = asyncHandler(async (req, res, next) => {
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
    new APIResponse(200, "Follow requests fetched successfully.", {
      followRequests: followRequests[0].followRequest,
    })
  );
});

export const createRequest = asyncHandler(async (req, res, next) => {
  const { userid, followid } = req.params;

  if (userid === followid) {
    return res
      .status(400)
      .json(new APIError(400, "User cannot follow itself!"));
  }

  const user = await User.findById(userid);
  const followUser = await User.findById(followid);

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
    return res.status(400).json(
      new APIResponse(400, "User is already a follower!", {
        alreadyFollower,
      })
    );
  }

  if (
    user.followRequested.includes(followid) &&
    followUser.followRequest.includes(userid)
  ) {
    const indexUser = user.followRequested.indexOf(followid);
    user.followRequested.splice(indexUser, 1);
    await user.save();

    const indexFollow = followUser.followRequest.indexOf(userid);
    followUser.followRequest.splice(indexFollow, 1);
    await followUser.save();

    return res
      .status(200)
      .json(new APIResponse(200, "Follow request deleted successfully."));
  }

  user.followRequested.push(followid);
  await user.save();

  followUser.followRequest.push(userid);
  await followUser.save();

  return res
    .status(200)
    .json(new APIResponse(200, "Follow request created successfully."));
});

export const acceptRequest = asyncHandler(async (req, res, next) => {
  const { userid, followid } = req.params;

  if (userid === followid) {
    return res
      .status(400)
      .json(new APIError(400, "User cannot follow itself!"));
  }

  const alreadyFollower = await Follow.aggregate([
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

  if (alreadyFollower?.length > 0) {
    return res.status(400).json(
      new APIResponse(400, "User is already a follower!", {
        alreadyFollower,
      })
    );
  }

  await Follow.create({
    follower: followid,
    following: userid,
  });

  const user = await User.findById(userid);
  const index = user.followRequest.indexOf(followid);
  user.followRequest.splice(index, 1);
  await user.save();

  const followUser = await User.findById(followid);
  const indexFollowUser = followUser.followRequested.indexOf(userid);
  followUser.followRequested.splice(indexFollowUser, 1);
  await followUser.save();

  return res
    .status(200)
    .json(new APIResponse(200, "Follow request accepted successfully."));
});

export const rejectRequest = asyncHandler(async (req, res, next) => {
  const { userid, followid } = req.params;

  const user = await User.findById(userid);
  const followUser = await User.findById(followid);

  if (!user.followRequest.includes(followid)) {
    return res
      .status(500)
      .json(new APIError(500, "Something went wrong, no request found."));
  }

  const index = user.followRequest.indexOf(followid);
  user.followRequest.splice(index, 1);
  await user.save();

  if (followUser.followRequested.includes(userid)) {
    const index = followUser.followRequested.indexOf(userid);
    followUser.followRequested.splice(index, 1);
    await followUser.save();
  }

  return res
    .status(200)
    .json(new APIResponse(200, "Follow request rejected successfully."));
});

export const removeFollower = asyncHandler(async (req, res, next) => {
  const { userid, followid } = req.params;

  if (userid === followid) {
    return res
      .status(400)
      .json(new APIError(400, "User cannot follow itself!"));
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
    return res.status(400).json(new APIError(400, "Follower not found!"));
  }

  await Follow.findByIdAndDelete(follower[0]._id);

  return res
    .status(200)
    .json(new APIResponse(200, "User removed from followers."));
});

export const unfollowUser = asyncHandler(async (req, res, next) => {
  const { userid, followid } = req.params;

  if (userid === followid) {
    return res
      .status(400)
      .json(new APIError(400, "User cannot follow itself!"));
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
    return res.status(400).json(new APIError(400, "Following not found!"));
  }

  await Follow.findByIdAndDelete(following[0]._id);

  return res
    .status(200)
    .json(new APIResponse(200, "User unfollowed from following."));
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
      followers,
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
    new APIResponse(200, "Following fetched successfully.", {
      following,
    })
  );
});

export const notFollowingUsers = asyncHandler(async (req, res, next) => {
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
        followRequested: 1,
      },
    },
  ]);

  return res.status(200).json(
    new APIResponse(200, "Fetched all not following users.", {
      users,
    })
  );
});
