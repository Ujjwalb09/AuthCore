import express from "express";
import {
  createPermission,
  deletePermissions,
  getPermissions,
} from "../controllers/permissionsController";
import { protect, adminOnly } from "../middlewares/authMiddlewares";

const router = express.Router();

router.post("/", protect, adminOnly, createPermission);
router.get("/", protect, adminOnly, getPermissions);
router.delete("/", protect, adminOnly, deletePermissions);
export default router;
