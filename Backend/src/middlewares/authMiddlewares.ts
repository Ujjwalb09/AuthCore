import jwt from "jsonwebtoken";
import { AutenticatedRequest } from "../types/types";
import asyncHandler from "express-async-handler";
import { User } from "../models/User";

export const protect = asyncHandler(
  async (req: AutenticatedRequest, res, next) => {
    let token: string | undefined;

    //fetch token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRENT as string
        ) as any;
        const user = await User.findById(decoded._id).select("-password");

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
