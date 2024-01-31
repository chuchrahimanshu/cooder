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

// Configuration Section
const router = express.Router();

// Non - Authenticated Routes Section
router.route("/").get(getAllUsers);

// Authenticated Routes Section
router
  .route("/:id")
  .get(verifyJWT, verifyUser, getSingleUser)
  .patch(verifyJWT, verifyUser, updateUser)
  .delete(verifyJWT, verifyUser, deleteUser);

// Export Section
export default router;
