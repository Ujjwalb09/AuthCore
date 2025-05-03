import express from "express";
import {
  assignRolesToUser,
  getUserPermissions,
  getAllUsers,
  removeRoleFromUser,
  deleteUser,
} from "../controllers/userController";
import { adminOnly, protect } from "../middlewares/authMiddlewares";

const router = express.Router();

router.get("/permissions", protect, getUserPermissions);
router.put("/:id/roles", protect, adminOnly, assignRolesToUser);
router.put("/:id/role", protect, adminOnly, removeRoleFromUser);
router.get("/", protect, adminOnly, getAllUsers);
router.delete("/", protect, adminOnly, deleteUser);

export default router;
