import { Router } from "express";
import { UserAvatarController } from "../controllers/UserAvatarController";
import { UsersController } from "../controllers/UsersController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { MULTER } from "../configs/upload";
import  multer from 'multer';

const usersRoutes = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController(); 

usersRoutes.post("/", usersController.create);
usersRoutes.patch("/avatar", ensureAuthenticated, multer(MULTER).single("avatar"), userAvatarController.update);
usersRoutes.get("/", ensureAuthenticated, usersController.show);
usersRoutes.post("/acl", ensureAuthenticated, usersController.access);

export { usersRoutes };
