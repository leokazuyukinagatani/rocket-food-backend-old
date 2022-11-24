import { Router } from "express";
import { RolePermissionCreateController } from "../controllers/RolePermissionCreateController";
import { RolesController } from '../controllers/RolesController'
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rolesRoutes = Router()
const rolesController = new RolesController()
const rolesPermissionController=  new RolePermissionCreateController()

rolesRoutes.use(ensureAuthenticated)
rolesRoutes.post('/',rolesController.create)
rolesRoutes.post('/:roleId', rolesPermissionController.create)


export {
  rolesRoutes
}