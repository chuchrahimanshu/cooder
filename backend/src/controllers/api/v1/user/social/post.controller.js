// Import Section
import { Post } from "../../../../../models/social/post.model.js";
import {
  CLOUDINARY_POST_IMAGE,
  CLOUDINARY_POST_VIDEO,
} from "../../../../../constants.js";
import {
  APIError,
  APIResponse,
  asyncHandler,
  uploadMediaToCloudinary,
} from "../../../../../utils/index.js";
import { User } from "../../../../../models/user/user.model.js";
import mongoose from "mongoose";

// Controller Actions - End Points
export const createPost = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { userid } = req.params;

  if (!content?.trim()) {
    return res
      .status(401)
      .json(new APIError(401, "Content is required to post"));
  }

  if (!userid) {
    return res.status(500).json(new APIError(500, "Internal Server Error"));
  }

  const post = await Post.create({
    user: userid,
    content: content,
  });

  if (!post) {
    return res.status(500).json(new APIError(500, "Internal Server Error"));
  }

  const imageUploadPromise = new Promise(async (resolve, reject) => {
    if (
      req.files &&
      Array.isArray(req.files.images) &&
      req.files.images.length > 0
    ) {
      const { images } = req.files;
      await Promise.all(
        images.map(async (image) => {
          const imageLocalPath = image.path;
          const { secure_url } = await uploadMediaToCloudinary(
            imageLocalPath,
            CLOUDINARY_POST_IMAGE
          );
          post.images.push(secure_url);
        })
      );
    }
    resolve();
  });

  const videoUploadPromise = new Promise(async (resolve, reject) => {
    if (
      req.files &&
      Array.isArray(req.files.videos) &&
      req.files.videos.length > 0
    ) {
      const { videos } = req.files;
      await Promise.all(
        videos.map(async (video) => {
          const videoLocalPath = video.path;
          const { secure_url } = await uploadMediaToCloudinary(
            videoLocalPath,
            CLOUDINARY_POST_VIDEO
          );
          post.videos.push(secure_url);
        })
      );
    }
    resolve();
  });

  Promise.all([imageUploadPromise, videoUploadPromise])
    .then(() => {
      return post.save();
    })
    .then(() => {
      return res
        .status(201)
        .json(new APIResponse(201, "Post Created Successfully"));
    })
    .catch(async (error) => {
      await Post.findByIdAndDelete(post._id);
      return res.status(500).json(
        new APIError(500, "Internal Server Error", {
          error,
        })
      );
    });
});

export const updatePost = asyncHandler(async (req, res, next) => {});

export const deletePost = asyncHandler(async (req, res, next) => {
  const { postid } = req.params;

  if (!postid) {
    return res.status(500).json(new APIError(500, "Internal Server Error"));
  }

  const post = await Post.findById(postid);

  if (!post) {
    return res.status(500).json(new APIError(500, "Post not found"));
  }

  await Post.findByIdAndDelete(postid);

  return res
    .status(200)
    .json(new APIResponse(201, "Post deleted successfully"));
});

export const getSinglePost = asyncHandler(async (req, res, next) => {});

export const getAllUserPosts = asyncHandler(async (req, res, next) => {});

export const getAllFollowingPosts = asyncHandler(async (req, res, next) => {
  const { userid } = req.params;

  const posts = await User.aggregate([
    {
      $match: {
        _id: {
          $eq: new mongoose.Types.ObjectId(userid),
        },
      },
    },
    {
      $lookup: {
        from: "follows",
        foreignField: "follower",
        localField: "_id",
        as: "followers",
        pipeline: [
          {
            $project: {
              following: 1,
              _id: 0,
            },
          },
          {
            $lookup: {
              from: "posts",
              foreignField: "user",
              localField: "following",
              as: "posts",
              pipeline: [
                {
                  $lookup: {
                    from: "users",
                    foreignField: "_id",
                    localField: "user",
                    as: "user",
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
                    user: {
                      $first: "$user",
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "posts",
        foreignField: "user",
        localField: "_id",
        as: "myPosts",
        pipeline: [
          {
            $lookup: {
              from: "users",
              foreignField: "_id",
              localField: "user",
              as: "user",
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
              user: {
                $first: "$user",
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        followers: 1,
        myPosts: 1,
      },
    },
    {
      $unwind: "$followers",
    },
    {
      $unwind: "$followers.posts",
    },
    {
      $group: {
        _id: null,
        allPosts: { $push: "$followers.posts" },
        myPosts: { $push: "$myPosts" },
      },
    },
    {
      $addFields: {
        all: {
          $concatArrays: ["$allPosts", { $arrayElemAt: ["$myPosts", 0] }],
        },
      },
    },
    {
      $project: {
        _id: 0,
        all: 1,
      },
    },
  ]);

  return res.status(200).json(
    new APIResponse(200, "All posts fetched successfully", {
      posts: posts[0].all,
    })
  );
});
