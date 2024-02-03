// Import Section
import mongoose from "mongoose";

// Schema Section
const commentSchema = new mongoose.Schema(
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
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose Model
const Comment = mongoose.model("Comment", commentSchema);

// Export Section
export { Comment };
