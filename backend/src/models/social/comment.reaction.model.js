// Import Section
import mongoose from "mongoose";

// Schema Section
const commentReactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose Model
const CommentReaction = mongoose.model(
  "CommentReaction",
  commentReactionSchema
);

// Export Section
export { CommentReaction };
