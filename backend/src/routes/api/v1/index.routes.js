// Import Section
import express from "express";
import authRouter from "./auth/auth.routes.js";
import userRouter from "./user/user.routes.js";
import postRouter from "./social/post.routes.js";

// Configuration Section
const router = express.Router();

// Middleware Section
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/posts", postRouter);

// Export Section
export default router;
