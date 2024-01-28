// Import Section
import mongoose from "mongoose";

// Schema Section
const tokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    refreshToken: {
      type: String,
    },
    emailVerification: {
      type: String,
    },
    twoFactorVerification: {
      type: String,
    },
    passwordVerification: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose Model
const Token = mongoose.model("Token", tokenSchema);

// Export Section
export { Token };
