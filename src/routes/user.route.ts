import { Router } from "express";
import {
  authenticateUser,
  authorizeUser,
} from "../middlewares/auth.middleware.js";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
import { getMyAccount } from "../controllers/auth.controller.js";

const userRouter = Router();

// ✅ Only logged in user can get his account details
userRouter.get("/my-account", authenticateUser, getMyAccount);

// ✅ Only admins can get all users
userRouter.get("/", authenticateUser, authorizeUser("admin"), getAllUsers);

// ✅ Any authenticated user can get a user by ID
userRouter.get("/:id", authenticateUser, getUserById);

// ✅ Any authenticated user can update themselves
userRouter.put("/:id", authenticateUser, updateUser);

// ✅ Only admins can delete users
userRouter.delete("/:id", authenticateUser, authorizeUser("admin"), deleteUser);

export default userRouter;
