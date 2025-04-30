import express from "express";
import { createRole, getRoles } from "../controllers/roleController";
import { protect, adminOnly } from "../middlewares/authMiddlewares";

const router = express.Router();

router.post("/", protect, adminOnly, createRole);
router.get("/", protect, adminOnly, getRoles);

export default router;
