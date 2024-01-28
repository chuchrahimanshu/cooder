// Import Section
import express from "express";
import authRouter from "./auth/auth.routes.js";

// Configuration Section
const router = express.Router();

// Middleware Section
router.use("/auth", authRouter);

// Export Section
export default router;
