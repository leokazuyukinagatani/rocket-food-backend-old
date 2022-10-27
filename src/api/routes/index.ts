import { Router } from "express";
import { usersRoutes } from './users.routes'


const routes = Router()

routes.use('/session', usersRoutes)
routes.use('/users', usersRoutes)
routes.use('/products', usersRoutes)

/*
routes.use('/categories', categoriesRoutes)
routes.use('/ingredients', ingredientsRoutes)
routes.use('/images', imagesRoutes)
routes.use('/favorites', favoritesRoutes)
*/


export {
  routes
}