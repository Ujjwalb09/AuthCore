import express from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { adminOnly, protect } from "../middlewares/authMiddlewares";

const router = express.Router();

//routes

router.post("/login", loginUser);
router.post("/register", protect, adminOnly, registerUser);

export default router;
