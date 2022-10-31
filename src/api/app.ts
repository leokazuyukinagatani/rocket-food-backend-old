import "dotenv/config";
import "express-async-errors";
import { Request, Response, NextFunction } from "express";
import express from 'express'
import cors from "cors";
import { routes } from "./routes";
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger_output.json'
import { AppError } from "./utils/AppError";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
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

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);
export { app };
