import { Schema, model, Document, Types } from "mongoose";
import { UserDocument } from "./user.model.js";

export interface PostAttrs {
  title: string;
  content: string;
  author: Types.ObjectId | UserDocument;
}

export interface PostDocument extends Document, PostAttrs {
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<PostDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: 10,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Post = model<PostDocument>("Post", postSchema);

export default Post;
