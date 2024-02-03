// Import Section
import mongoose from "mongoose";

// Schema Section
const debuggerTicketRatingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DebuggerTicket",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

// Mongoose Model
const DebuggerTicketRating = mongoose.model(
  "DebuggerTicketRating",
  debuggerTicketRatingSchema
);

// Export Section
export { DebuggerTicketRating };
