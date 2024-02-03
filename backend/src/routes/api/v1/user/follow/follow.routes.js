// Import Section
import express from "express";
import { makeFollower } from "../../../../../controllers/api/v1/index.js";

// Configuration Section
const router = express.Router({ mergeParams: true });

// Authenticated Routes Section
router.route("/:followid").get(makeFollower);

// Export Section
export default router;
