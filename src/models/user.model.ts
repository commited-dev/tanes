import { Schema, model, Document } from "mongoose";

// 🔹 Define allowed roles
export type UserRole = "user" | "admin" | "moderator";

// 🔹 Attributes required to create a User
export interface UserAttrs {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

// 🔹 Document type for a User in MongoDB
export interface UserDocument extends Document, UserAttrs {}

// 🔹 Schema definition
const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
  },
  { timestamps: true }
);

// 🔹 Create model with typed document
const User = model<UserDocument>("User", userSchema);

export default User;
