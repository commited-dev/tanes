import type { Request, Response, NextFunction } from "express";
import Post, { PostDocument } from "../models/post.model.js";

// ✅ Create a new post (user only)
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user?._id,
    });

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// ✅ Get all posts (anyone authenticated)
export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find().populate("author", "name email role");
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

// ✅ Get single post
export const getPostById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email role"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// ✅ Update post (owner or admin/moderator)
export const updatePost = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Only author, admin, or moderator can update
    if (
      post.author.toString() !== req.user?._id.toString() &&
      req.user?.role !== "admin" &&
      req.user?.role !== "moderator"
    ) {
      return res
        .status(403)
        .json({ message: "Forbidden: cannot update this post" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    await post.save();

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// ✅ Delete post (owner, admin, or moderator)
export const deletePost = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (
      post.author.toString() !== req.user?._id.toString() &&
      req.user?.role !== "admin" &&
      req.user?.role !== "moderator"
    ) {
      return res
        .status(403)
        .json({ message: "Forbidden: cannot delete this post" });
    }

    await post.deleteOne();
    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    next(error);
  }
};
