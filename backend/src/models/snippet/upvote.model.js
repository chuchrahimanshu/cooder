// Import Section
import mongoose from "mongoose";

// Schema Section
const snippetUpvoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    snippet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Snippet",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose Model
const SnippetUpvote = mongoose.model("SnippetUpvote", snippetUpvoteSchema);

// Export Section
export { SnippetUpvote };
