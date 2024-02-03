// Import Section
import mongoose from "mongoose";

// Schema Section
const replyReactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reply: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose Model
const ReplyReaction = mongoose.model("ReplyReaction", replyReactionSchema);

// Export Section
export { ReplyReaction };
