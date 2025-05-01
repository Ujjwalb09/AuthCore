import express from "express";
import {
  addPermissionsToRole,
  createRole,
  getRoles,
  removePermissionsFromRole,
} from "../controllers/roleController";
import { protect, adminOnly } from "../middlewares/authMiddlewares";

const router = express.Router();

router.post("/", protect, adminOnly, createRole);
router.get("/", protect, adminOnly, getRoles);
router.put(
  "/:id/remove-permissions",
  protect,
  adminOnly,
  removePermissionsFromRole
);
router.put("/:id/add-permissions", protect, adminOnly, addPermissionsToRole);
export default router;
