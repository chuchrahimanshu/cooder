// Import Section
import mongoose from "mongoose";

// Schema Section
const snippetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    visibility: {
      type: String,
      enum: ["PUBLIC", "PRIVATE"],
      default: "PUBLIC",
    },
    tags: [
      {
        type: String,
      },
    ],
    dependencies: [
      {
        name: String,
        version: String,
      },
    ],
    links: [
      {
        title: String,
        url: String,
      },
    ],
    contributors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Mongoose Model
const Snippet = mongoose.model("Snippet", snippetSchema);

// Export Section
export { Snippet };
