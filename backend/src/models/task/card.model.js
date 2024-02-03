// Import Section
import mongoose from "mongoose";

// Schema Section
const taskCardSchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
    title: {
      type: String,
    },
    color: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

// Mongoose Model
const TaskCard = mongoose.model("TaskCard", taskCardSchema);

// Export Section
export { TaskCard };
