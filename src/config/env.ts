import { config } from "dotenv";

// Load env file based on NODE_ENV
config({ path: `.env.${process.env.NODE_ENV || "develop.local"}` });

function getEnv(key: string, required = true): string {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
  return value || "";
}

export const NODE_ENV = getEnv("NODE_ENV", false) || "development";
export const PORT = parseInt(getEnv("PORT", false) || "5500", 10);
export const SERVER_URL =
  getEnv("SERVER_URL", false) || "http://localhost:5500";
export const MONGODB_URI = getEnv("MONGODB_URI");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_EXPIRES_IN = getEnv("JWT_EXPIRES_IN", false) || "1d";
