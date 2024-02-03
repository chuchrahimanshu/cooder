// Import Section
import mongoose from "mongoose";

// Schema Section
const taskNoteSchema = new mongoose.Schema(
  {
    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskCard",
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Mongoose Model
const TaskNote = mongoose.model("TaskNote", taskNoteSchema);

// Export Section
export { TaskNote };
