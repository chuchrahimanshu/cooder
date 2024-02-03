// Import Section
import express from "express";
import noteRouter from "./note.routes.js";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getSingleTask,
  updateTask,
} from "../../../../../controllers/api/v1/index.js";

// Configuration Section
const router = express.Router({ mergeParams: true });

// Middleware Section
router.use("/:taskid/notes", noteRouter);

// Authenticated Routes Section
router.route("/").get(getAllTasks).post(createTask);
router
  .route("/:taskid")
  .get(getSingleTask)
  .patch(updateTask)
  .delete(deleteTask);

// Export Section
export default router;
