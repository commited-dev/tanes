import jwt, { JwtPayload } from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";

import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import { UserRole } from "../models/user.model.js";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: typeof User.prototype;
    }
  }
}

// Type for decoded JWT payload
interface DecodedToken extends JwtPayload {
  userId?: string;
}

// ✅ Step 1: Authenticate any logged-in user
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  try {
    let token: string | undefined;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    const user = await User.findById(decoded.userId);

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res
      .status(401)
      .json({ message: "Unauthorized", error: errorMessage });
  }
};

// ✅ Step 2: Authorize based on roles
export const authorizeUser = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void | Response => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
};
