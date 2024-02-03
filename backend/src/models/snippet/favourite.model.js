// Import Section
import mongoose from "mongoose";

// Schema Section
const snippetFavouriteSchema = new mongoose.Schema(
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
const SnippetFavourite = mongoose.model(
  "SnippetFavourite",
  snippetFavouriteSchema
);

// Export Section
export { SnippetFavourite };
