import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "develop.local"}` });

export const { PORT, SERVER_URL, NODE_ENV, MONGODB_URI } = process.env;
