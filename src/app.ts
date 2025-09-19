import express from "express";
import type { Request, Response } from "express";

import authRouter from "./routes/auth.routes.js";
import { setupSwagger } from "./swagger.js";
import userRouter from "./routes/user.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

// ✅ Health check route
app.get("/api/v1/health", (_req: Request, res: Response): void => {
  res.status(200).json({ status: "ok" });
});

// ✅ Feature routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

// ✅ Swagger docs
setupSwagger(app);

// ✅ Error handler (must be last)
app.use(errorMiddleware);

export default app;
