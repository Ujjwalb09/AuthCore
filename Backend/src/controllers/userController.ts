import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { IUserDocument, User } from "../models/User";
import { IRoleDocument, Role } from "../models/Role";
import { AuthenticatedRequest } from "../types/types";

export const assignRolesToUser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.params.id;
    const { roleIds } = req.body;

    const user = (await User.findById(userId)) as IUserDocument;

    if (!user) res.status(400).json({ message: "user not found" });

    user.roles = roleIds;

    const savedUser = await user.save();

    res.status(200).json({
      message: "Roles assigned successfully",
      data: savedUser,
    });
  }
);

export const getUserPermissions = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = await User.findById(req.user?._id).populate<{
      roles: IRoleDocument[];
    }>("roles");

    if (!user) res.status(400).json("User not found");

    //fetching role IDs of roles User have.
    const roleIds = user?.roles.map((role) => role._id);

    //populating permissions roles
    const rolesWithPermissions = await Role.find({
      _id: { $in: roleIds },
    }).populate("permissions");

    const allPermissions: string[] = [];

    for (const role of rolesWithPermissions) {
      const permissionNames = role.permissions.map((perm: any) => perm.name);
      allPermissions.push(...permissionNames);
    }

    const uniquePermissions = Array.from(new Set(allPermissions));

    res.status(200).json({
      message: "Permissions fetched successfully",
      data: uniquePermissions,
    });
  }
);

export const getAllUsers = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const users = await User.find().populate({
      path: "roles",
      select: "names permissions",
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
