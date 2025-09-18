import mongoose from "mongoose";
import { NODE_ENV, MONGODB_URI } from "./env.js";
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variables inside .env.<develop|production>.local");
}
if (NODE_ENV !== "production") {
    mongoose.set("debug", true);
}
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log(`✅ MongoDB connected in ${NODE_ENV} mode`);
    }
    catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};
