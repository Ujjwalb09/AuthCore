import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

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

export default app;
