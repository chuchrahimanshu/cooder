// Import Section
import mongoose from "mongoose";

// Schema Section
const replyQuoteSchema = new mongoose.Schema(
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
    quote: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose Model
const ReplyQuote = mongoose.model("ReplyQuote", replyQuoteSchema);

// Export Section
export { ReplyQuote };
