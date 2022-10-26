import "dotenv/config";
import "express-async-errors";
import { AppError } from "./utils/AppError";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { routes } from "./routes";
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger_output.json'

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
    console.log(error);

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

export { app };
