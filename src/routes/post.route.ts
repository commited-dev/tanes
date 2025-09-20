import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.get("/", authenticateUser, getPosts);

postRouter.post("/", authenticateUser, createPost);

postRouter.get("/:id", authenticateUser, getPostById);

postRouter.put("/:id", authenticateUser, updatePost);

postRouter.delete("/:id", authenticateUser, deletePost);

export default postRouter;
