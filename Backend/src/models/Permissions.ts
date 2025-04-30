import mongoose, { Schema, Document } from "mongoose";
import { IPermission } from "../types/types";

export interface IPermissionDocument extends IPermission, Document {}

const permissionsSchema = new Schema<IPermissionDocument>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Permission = mongoose.model<IPermissionDocument>(
  "Permission",
  permissionsSchema
);
