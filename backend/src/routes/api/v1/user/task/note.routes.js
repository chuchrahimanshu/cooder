// Import Section
import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote,
} from "../../../../../controllers/api/v1/index.js";

// Configuration Section
const router = express.Router();

// Authenticated Routes Section
router.route("/").get(getAllNotes).post(createNote);
router.route("/:id").get(getSingleNote).patch(updateNote).delete(deleteNote);

// Export Section
export default router;
