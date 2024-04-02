// Import Section
import mongoose from "mongoose";

// Schema Section
const replySchema = new mongoose.Schema(
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
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    quote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply",
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose Model
const Reply = mongoose.model("Reply", replySchema);

// Export Section
export { Reply };
