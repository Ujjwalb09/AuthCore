import { Request, Response } from "express";
import { ObjectId } from "mongoose";

//User interface for User model
export interface IUser {
  name: string;
  email: string;
  password: string;
  roles: ObjectId[];
  isAdmin: boolean;
}
