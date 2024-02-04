// Import Section
import express from "express";
import solutionRouter from "./solution.routes.js";

// Configuration Section
const router = express.Router({ mergeParams: true });

// Middleware Section
router.use("/:ticketid/solutions", solutionRouter);

// Authenticated Routes Section
router.route("/").get(getAllTickets).post(createTicket);
router
  .route("/:ticketid")
  .get(getSingleTicket)
  .patch(updateTicket)
  .delete(deleteTicket);

// Non - Authenticated Routes Section
router.route("/:ticketid/rating").post(addTicketRating);

// Export Section
export default router;
