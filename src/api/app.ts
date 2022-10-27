import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";
import { routes } from "./routes";
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger_output.json'

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


export { app };
