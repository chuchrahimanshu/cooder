// Import Section
import express from "express";
import { verifyJWT } from "../../../../middlewares/auth.middleware.js";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../../../../controllers/api/v1/user/user.controller.js";

// Configuration Section
const router = express.Router();

// Authenticated Routes Section
router.route("/").get(verifyJWT, getAllUsers);
router
  .route("/:id")
  .get(verifyJWT, getSingleUser)
  .patch(verifyJWT, updateUser)
  .delete(verifyJWT, deleteUser);

// Export Section
export default router;
