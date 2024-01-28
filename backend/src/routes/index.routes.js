// Import Section
import express from "express";
import apiRouter from "./api/index.routes.js";

// Configuration Section
const router = express.Router();

// Middleware Section
router.use("/api", apiRouter);

// Export Section
export default router;
