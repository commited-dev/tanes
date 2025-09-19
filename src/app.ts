import express from "express";

import authRouter from "./routes/auth.routes.js";
import { setupSwagger } from "./swagger.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);

setupSwagger(app);

export default app;
