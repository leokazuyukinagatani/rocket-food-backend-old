import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/", ensureAuthenticated, usersController.show);
usersRoutes.post("/acl", ensureAuthenticated, usersController.access);

export { usersRoutes };
