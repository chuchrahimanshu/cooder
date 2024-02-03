// Import Section
import mongoose from "mongoose";

// Schema Section
const debuggerSolutionUnsolvedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    solution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DebuggerSolution",
      required: true,
    },
  },
  { timestamps: true }
);

// Mongoose Model
const DebuggerSolutionUnsolved = mongoose.model(
  "DebuggerSolutionUnsolved",
  debuggerSolutionUnsolvedSchema
);

// Export Section
export { DebuggerSolutionUnsolved };
