import express from "express";

import type { Request, Response } from "express"; // Type-only import

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express + TypeScript + ESM 🚀" });
});

export default app;
