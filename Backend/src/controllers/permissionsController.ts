import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Permission } from "../models/Permissions";

export const createPermission = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const existingPermission = await Permission.findOne({ name });

    //if permission already exists
    if (existingPermission) {
      res.status(400).json({ message: "Permission already exists" });
    }

    const permission = await Permission.create({ name });

    res.status(200).json({
      message: "Permission created successfully",
      data: permission,
    });
  }
);

export const getPermissions = asyncHandler(
  async (req: Request, res: Response) => {
    const permissions = await Permission.find();
    res.status(200).json({
      message: "Permissions fetched",
      data: permissions,
    });
  }
);

export const deletePermissions = asyncHandler(
  async (req: Request, res: Response) => {
    const { permissionId } = req.body;

    // const allPermissions = await Permission.find();

    // const updatedPermissions = allPermissions.filter(
    //   (perm) => perm != permissionId
    // );

    //save the updated permissions
    await Permission.deleteOne({ _id: permissionId });

    res.status(200).json({
      message: "Permission deleted successfully",
    });
  }
);
