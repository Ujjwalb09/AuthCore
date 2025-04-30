import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/types";
import asyncHandler from "express-async-handler";
import { User } from "../models/User";
import { NextFunction, Response } from "express";

//middleware to check if request has valid JWT token
export const protect = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    //fetch token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        console.log("token", token);

        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as any;

        console.log("decoded", decoded);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
          res.status(401);
          throw new Error("User not found");
        }

        req.user = {
          _id: user._id as string,
          isAdmin: user.isAdmin,
        };
        next();
      } catch (error) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }
    }
  }
);

export const adminOnly = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error("Admin access only");
  }
};
