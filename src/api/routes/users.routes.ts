import { Router } from "express";
import { UsersController } from '../controllers/UsersController'
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router()
const usersController = new UsersController()


usersRoutes.use(ensureAuthenticated)
usersRoutes.post('/', usersController.create)
usersRoutes.get('/', usersController.show)
//usersRoutes.put('/', usersController.update)

export {
  usersRoutes
}