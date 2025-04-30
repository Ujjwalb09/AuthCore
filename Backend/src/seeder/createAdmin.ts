import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/User";
import generateToken from "../utils/generateToken";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const adminExists = await User.findOne({ email: "admin@admin.com" });

    if (adminExists) {
      console.log("Admin user already exists");
      process.exit();
    }

    const admin = await User.create({
      name: "Admin",
      email: "admin@admin.com",
      password: "admin",
      isAdmin: true,
      roles: [],
    });

    const generatedToken = generateToken(admin._id as string);

    console.log("Admin created successfully", { ...admin, generatedToken });
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createAdmin();
