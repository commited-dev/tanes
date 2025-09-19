import type { Request, Response, NextFunction } from "express";

// Extend Error to include statusCode and extra fields
interface ErrorWithStatus extends Error {
  statusCode?: number;
  code?: number;
  value?: string;
  errors?: Record<string, { message: string }>;
}

export const errorMiddleware = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    let error: ErrorWithStatus = { ...err };
    error.message = err.message;

    // Log original error
    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = `Resource not found with id of ${err.value}`;
      error = new Error(message) as ErrorWithStatus;
      error.statusCode = 404;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message) as ErrorWithStatus;
      error.statusCode = 400;
    }

    // Mongoose validation error
    if (err.name === "ValidationError" && err.errors) {
      const message = Object.values(err.errors)
        .map((val) => val.message)
        .join(", ");
      error = new Error(message) as ErrorWithStatus;
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  } catch (internalError) {
    next(internalError);
  }
};
