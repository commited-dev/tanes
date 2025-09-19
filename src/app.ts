import express from "express";
import type { Request, Response } from "express";

import authRouter from "./routes/auth.routes.js";
import { setupSwagger } from "./swagger.js";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(express.json());

// ✅ Health check route
app.get("/api/v1/health", (_req: Request, res: Response): void => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

setupSwagger(app);

export default app;
