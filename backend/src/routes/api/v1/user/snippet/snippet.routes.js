// Import Section
import express from "express";
import {
  addSnippetToFavourites,
  createSnippet,
  deleteSnippet,
  downvoteOnSnippet,
  getAllSnippets,
  getSingleSnippet,
  updateSnippet,
  upvoteOnSnippet,
} from "../../../../../controllers/api/v1/index.js";

// Configuration Section
const router = express.Router({ mergeParams: true });

// Authenticated Routes Section
router.route("/").get(getAllSnippets).post(createSnippet);
router
  .route("/:snippetid")
  .get(getSingleSnippet)
  .patch(updateSnippet)
  .delete(deleteSnippet);

// Non - Authenticated Routes Section
router.route("/:snippetid/upvote").get(upvoteOnSnippet);
router.route("/:snippetid/downvote").get(downvoteOnSnippet);
router.route("/:snippetid/favourites").get(addSnippetToFavourites);

// Export Section
export default router;
