import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { IUserDocument, User } from "../models/User";
import { IRoleDocument, Role } from "../models/Role";
import { AuthenticatedRequest } from "../types/types";
import { IPermissionDocument } from "../models/Permissions";

export const assignRolesToUser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.params.id;
    const { roleIds } = req.body;

    const user = (await User.findById(userId)) as IUserDocument;

    if (!user) res.status(400).json({ message: "user not found" });

    user.roles.push(...roleIds);

    const savedUser = await user.save();

    res.status(200).json({
      message: "Roles assigned successfully",
      data: savedUser,
    });
  }
);

export const removeRoleFromUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { roleId } = req.body;
    console.log("roleId", roleId);

    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json("User not found");
      return;
    }
    const updatedRoles = user.roles.filter((id) => id.toString() !== roleId);
    user.roles = updatedRoles;

    await user.save();

    res.status(200).json({ message: "Role removed successfully" });
  }
);

export const getUserPermissions = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = await User.findById(req.user?._id).populate<{
      roles: IRoleDocument[];
      permissions: IPermissionDocument[];
    }>({
      path: "roles",

      populate: {
        path: "permissions",
      },
    });

    if (!user) {
      res.status(400).json("User not found");
      return;
    }

    const allPermissions = user.roles.map((role) =>
      role.permissions.map((perm: any) => perm.name)
    );

    const uniquePermissions = [...new Set(allPermissions.flat())];

    res.status(200).json({
      message: "Permissions fetched successfully",
      permissionsData: uniquePermissions,
      rolesData: user.roles,
    });
  }
);

export const getAllUsers = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const users = await User.find().populate({
      path: "roles",
      select: "name permissions",
      populate: {
        path: "permissions",
        select: "name",
      },
    });

    res.status(200).json({
      message: "Users fetched succesffully",
      data: users,
    });
  }
);

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.body;

  await User.deleteOne({ userId });

  res.status(200).json({ message: "User deleted successfully" });
});
