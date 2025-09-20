import { Router } from "express";
import {
  getMyAccount,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/login", login);

authRouter.post("/register", register);

authRouter.get("/my-account", authenticateUser, getMyAccount);

authRouter.post("/logout", logout);

export default authRouter;
