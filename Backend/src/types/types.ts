import { Request, Response } from "express";
import { ObjectId } from "mongoose";

//User interface for User model schema
export interface IUser {
  name: string;
  email: string;
  password: string;
  roles: ObjectId[];
  isAdmin: boolean;
}

export interface IPermission {
  name: string;
}

export interface IRole {
  // _id?: string;
  name: string;
  permissions: string[];
}

export interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    isAdmin: boolean;
  };
}
