// Import Section
import express from "express";
import noteRouter from "./note.routes.js";
import {
  createCard,
  deleteCard,
  getAllCards,
  getSingleCard,
  updateCard,
} from "../../../../../controllers/api/v1/index.js";

// Configuration Section
const router = express.Router({ mergeParams: true });

// Middleware Section
router.use("/:cardid/notes", noteRouter);

// Authenticated Routes Section
router.route("/").get(getAllCards).post(createCard);
router
  .route("/:cardid")
  .get(getSingleCard)
  .patch(updateCard)
  .delete(deleteCard);

// Export Section
export default router;
