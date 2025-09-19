import express from "express";

import authRouter from "./routes/auth.routes.js";
import { setupSwagger } from "./swagger.js";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

setupSwagger(app);

export default app;
