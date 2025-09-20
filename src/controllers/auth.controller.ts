import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";

import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

import User from "../models/user.model.js";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email address or password") as Error & {
        statusCode?: number;
      };
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid email address or password") as Error & {
        statusCode?: number;
      };
      error.statusCode = 401;
      throw error;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET as string,
      {
        expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successfully",
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists!") as Error & {
        statusCode?: number;
      };
      error.statusCode = 409;
      throw error;
    }

    // hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session: session }
    );

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    if (!JWT_EXPIRES_IN) {
      throw new Error("JWT_EXPIRES_IN is not defined");
    }

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET as string, {
      expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      succes: true,
      message: "User created succesfully",
      data: { user: newUsers[0], token },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const getMyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // No server-side action needed if JWT is stateless.
    res.status(200).json({
      success: true,
      message: "Logout successful. Please remove token on client side.",
    });
  } catch (error) {
    next(error);
  }
};
