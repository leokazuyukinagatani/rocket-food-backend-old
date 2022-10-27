import { Router } from "express";
import { usersRoutes } from './users.routes'
import { productsRoutes } from './products.routes'
import { categoriesRoutes } from './categories.routes'
import { ingredientsRoutes } from './ingredients.routes'
import { imagesRoutes } from './images.routes'
import { favoritesRoutes } from './favorites.routes'

/*
import { ordersRoutes } from './orders.routes'
import { paymentsRoutes } from './payments.routes'
*/



const routes = Router()

routes.use('/session', usersRoutes)
routes.use('/users', usersRoutes)
routes.use('/products', productsRoutes)


routes.use('/categories', categoriesRoutes)
routes.use('/ingredients', ingredientsRoutes)
routes.use('/images', imagesRoutes)
routes.use('/favorites', favoritesRoutes)



export {
  routes
}