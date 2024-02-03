// Import Section
import mongoose from "mongoose";

// Schema Section
const debuggerSolutionSchema = new mongoose.Schema(
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
    accepted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// Mongoose Model
const DebuggerSolution = mongoose.model(
  "DebuggerSolution",
  debuggerSolutionSchema
);

// Export Section
export { DebuggerSolution };
