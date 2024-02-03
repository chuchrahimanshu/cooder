// Import Section
import mongoose from "mongoose";

// Schema Section
const debuggerSolutionSolvedSchema = new mongoose.Schema(
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
const DebuggerSolutionSolved = mongoose.model(
  "DebuggerSolutionSolved",
  debuggerSolutionSolvedSchema
);

// Export Section
export { DebuggerSolutionSolved };
