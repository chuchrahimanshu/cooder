// Import Section
import mongoose from "mongoose";

// Schema Section
const postReactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose Model
const PostReaction = mongoose.model("PostReaction", postReactionSchema);

// Export Section
export { PostReaction };
