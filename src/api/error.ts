import { app } from "./app";
import { AppError } from "./utils/AppError";
import { NextFunction, Request, Response } from "express";
app.use(
  (
    error: AppError,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }
    console.log(error);

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);