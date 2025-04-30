import mongoose, { Schema, Document } from "mongoose";
import { IRole } from "../types/types";

export interface IRoleDocument extends IRole, Document {}

const roleSchema = new Schema<IRoleDocument>({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: mongoose.Schema.ObjectId, ref: "Permission" }],
});

export const Roles = mongoose.model<IRoleDocument>("Role", roleSchema);
