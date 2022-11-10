import { Router } from "express";
import { RolesController } from '../controllers/RolesController'
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rolesRoutes = Router()
const rolesController = new RolesController()


rolesRoutes.use(ensureAuthenticated)
rolesRoutes.post('/',rolesController.create)



export {
  rolesRoutes
}