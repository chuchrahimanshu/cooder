// Import Section
import express from "express";
import { verifyJWT } from "../../../../middlewares/auth.middleware.js";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../../../../controllers/api/v1/user/user.controller.js";
import { verifyUser } from "../../../../middlewares/user.middleware.js";
import userUpdateRouter from "./user.update.routes.js";
import userDeleteRouter from "./user.delete.routes.js";

// Configuration Section
const router = express.Router();

// Middleware Section
router.use("/:username/update", userUpdateRouter);
router.use("/:username/delete", userDeleteRouter);

// Non - Authenticated Routes Section
router.route("/").get(getAllUsers);

// Authenticated Routes Section
router.route("/:username").get(verifyJWT, verifyUser, getSingleUser);

// Export Section
export default router;
