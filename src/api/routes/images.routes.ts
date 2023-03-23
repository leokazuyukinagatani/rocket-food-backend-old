import { Router } from "express";
import { ImagesController } from "../controllers/ImagesController";
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const imagesRoutes = Router();
const imagesController = new ImagesController();
const upload = multer(uploadConfig.MULTER);

imagesRoutes.delete("/:id", imagesController.delete);
imagesRoutes.put("/", imagesController.update);
imagesRoutes.get("/:id", imagesController.show);
imagesRoutes.post('/',upload.single("image"), imagesController.create);
imagesRoutes.get('/', imagesController.index);

export { imagesRoutes };
