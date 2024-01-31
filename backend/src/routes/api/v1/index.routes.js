// Import Section
import express from "express";
import authRouter from "./auth/auth.routes.js";
import userRouter from "./user/user.routes.js";

// Configuration Section
const router = express.Router();

// Middleware Section
router.use("/auth", authRouter);
router.use("/user", userRouter);

// Export Section
export default router;
