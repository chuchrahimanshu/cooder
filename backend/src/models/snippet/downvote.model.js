// Import Section
import mongoose from "mongoose";

// Schema Section
const snippetDownvoteSchema = new mongoose.Schema(
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
const SnippetDownvote = mongoose.model(
  "SnippetDownvote",
  snippetDownvoteSchema
);

// Export Section
export { SnippetDownvote };
