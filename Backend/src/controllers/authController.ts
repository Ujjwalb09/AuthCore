import { Request, Response } from "express";
import generateToken from "../utils/generateToken";
import { User } from "../models/User";
import asyncHandler from "express-async-handler";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password, isAdmin, roles } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "User already exists", data: {} });
    }

    const user = await User.create({
      name,
      email,
      password,
      isAdmin,
      roles,
    });

    const generatedToken = generateToken(user._id as string);

    res.status(201).json({
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        roles: user.roles,
        token: generatedToken,
      },
    });
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchedPassword(password))) {
    const generatedToken = generateToken(user._id as string);

    res.status(200).json({
      message: "Login successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        roles: user.roles,
        token: generatedToken,
      },
    });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
});
