import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import permissionRoutes from "./routes/permission";
import roleRoutes from "./routes/roles";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//connect to mongoDB
connectDB();

//test route
app.get("/", (req, res) => {
  res.send("API is running");
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/permission", permissionRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/users", userRoutes);
export default app;
