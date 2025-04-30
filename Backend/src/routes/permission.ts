import express from "express";
import {
  createPermission,
  getPermissions,
} from "../controllers/permissionsController";
import { protect, adminOnly } from "../middlewares/authMiddlewares";

const router = express.Router();

router.post("/", protect, adminOnly, createPermission);
router.get("/", protect, adminOnly, getPermissions);

export default router;
