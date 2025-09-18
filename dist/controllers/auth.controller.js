import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import User from "../models/user.model.js";
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("Invalid email address or password");
            error.statusCode = 404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error("Invalid email address or password");
            error.statusCode = 401;
            throw error;
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
        res.status(200).json({
            success: true,
            message: "Login successfully",
            data: { user, token },
        });
    }
    catch (error) {
        next(error);
    }
};
export const register = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists!");
            error.statusCode = 409;
            throw error;
        }
        // hash the password before saving the user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUsers = await User.create([{ name, email, password: hashedPassword }], { session: session });
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        if (!JWT_EXPIRES_IN) {
            throw new Error("JWT_EXPIRES_IN is not defined");
        }
        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            succes: true,
            message: "User created succesfully",
            data: { user: newUsers[0], token },
        });
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};
export const logout = async (req, res, next) => {
    try {
        // No server-side action needed if JWT is stateless.
        res.status(200).json({
            success: true,
            message: "Logout successful. Please remove token on client side.",
        });
    }
    catch (error) {
        next(error);
    }
};
