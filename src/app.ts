import express from "express";

import type { Request, Response } from "express"; // Type-only import
import authRouter from "./routes/auth.routes.ts";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);

export default app;
