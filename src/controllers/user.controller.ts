import type { Request, Response, NextFunction } from "express";
import User, { UserDocument, UserRole } from "../models/user.model.js";

// ✅ GET /users - Only admins (handled by middleware)
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users: UserDocument[] = await User.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ GET /users/:id
export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ PUT /users/:id
export const updateUser = async (
  req: Request<{ id: string }, {}, Partial<UserDocument>>,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { id } = req.params;

    // User can update self, admin can update anyone
    if (req.user?._id.toString() !== id && req.user?.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: cannot update this user" });
    }

    // Prevent role escalation unless admin
    if (req.body.role && req.user?.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: cannot change role" });
    }

    // Safelist fields
    const allowedFields: (keyof UserDocument)[] = ["name", "email", "role"];
    const updates: Partial<UserDocument> = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
      select: "-password",
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
    next(error);
  }
};

// ✅ DELETE /users/:id
export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { id } = req.params;

    // Prevent admins from deleting themselves (optional safeguard)
    if (req.user?._id.toString() === id) {
      return res
        .status(400)
        .json({ message: "Admins cannot delete themselves" });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
    next(error);
  }
};
