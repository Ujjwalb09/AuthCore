import express from "express";
import {
  assignRolesToUser,
  getUserPermissions,
  getAllUsers,
} from "../controllers/userController";
import { adminOnly, protect } from "../middlewares/authMiddlewares";

const router = express.Router();

router.get("/permissions", protect, getUserPermissions);
router.put("/:id/roles", protect, adminOnly, assignRolesToUser);
router.get("/", protect, adminOnly, getAllUsers);

export default router;
