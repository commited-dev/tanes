import type { Request, Response, NextFunction } from "express";

import { aj } from "../config/arcjet.js";
import { ArcjetDecision } from "@arcjet/node";

export const arcjetMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const decision: ArcjetDecision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      switch (decision.reason.type) {
        case "RATE_LIMIT":
          res.status(429).json({ error: "Rate limit exceeded" });
          return;
        case "BOT":
          res.status(403).json({ error: "Bot access denied" });
          return;
        default:
          res.status(403).json({ error: "Access denied" });
          return;
      }
    }

    next();
  } catch (error) {
    console.log(`Arcjet Middleware Error: ${error}`);
    next(error);
  }
};
