// Import Section
import mongoose from "mongoose";

// Schema Section
const debuggerTicketSchema = new mongoose.Schema(
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
      requierd: true,
    },
    code: [
      {
        title: {
          type: String,
        },
        snippet: {
          type: String,
        },
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advance"],
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
const DebuggerTicket = mongoose.model("DebuggerTicket", debuggerTicketSchema);

// Export Section
export { DebuggerTicket };
