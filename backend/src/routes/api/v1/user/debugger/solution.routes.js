// Import Section
import express from "express";

// Configuration Section
const router = express.Router({ mergeParams: true });

// Authenticated Routes Section
router.route("/").get(getAllSolutions).post(createSolution);
router
  .route("/:solutionid")
  .get(getSingleSolution)
  .patch(updateSolution)
  .delete(deleteSolution);

// Non - Authenticated Routes Section
router.route("/:solutionid/solved").post(markSolutionSolved);
router.route("/:solutionid/unsolved").post(markSolutionUnsolved);

// Export Section
export default router;
