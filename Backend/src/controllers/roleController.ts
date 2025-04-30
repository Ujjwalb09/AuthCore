import { Response, Request } from "express";
import { Role } from "../models/Role";
import asyncHandler from "express-async-handler";

export const createRole = asyncHandler(async (req: Request, res: Response) => {
  const { name, permissions } = req.body;

  const existing = await Role.findOne({ name });

  if (existing) res.status(400).json({ message: "Role already exists" });

  const role = await Role.create({ name, permissions });

  res.status(200).json({
    message: "Role created successfully",
    data: role,
  });
});

export const getRoles = asyncHandler(async (req: Request, res: Response) => {
  const roles = await Role.find().populate("permissions", "name");
  res.status(200).json({
    message: "Roles fetched successfully",
    data: roles,
  });
});
