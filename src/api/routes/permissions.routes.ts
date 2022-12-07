import { Router } from "express";
import { PermissionsController } from "../controllers/PermissionsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const permissionsRoutes = Router();
const permissionsController = new PermissionsController();

permissionsRoutes.use(ensureAuthenticated);
permissionsRoutes.post("/", permissionsController.create);

export { permissionsRoutes };
