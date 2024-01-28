// Import Section
import express from "express";
import "dotenv";
import "./config/database.config.js";
import morgan from "morgan";

// Configuration Section
const app = express();

// Middleware Section
app.use(morgan("dev")); // HTTP Request Logger
app.use(express.json()); // Add body in req Object - req.body

// Export Section
export { app };
