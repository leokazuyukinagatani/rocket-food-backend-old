import { Router } from "express";
import multer from "multer";
import { UserAvatarController } from "../controllers/UserAvatarController";
import { UsersController } from "../controllers/UsersController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { MULTER } from "../configs/upload";

const usersRoutes = Router();
const upload = multer(MULTER);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController(); 

usersRoutes.post("/", usersController.create);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);
usersRoutes.get("/", ensureAuthenticated, usersController.show);
usersRoutes.post("/acl", ensureAuthenticated, usersController.access);

export { usersRoutes };
