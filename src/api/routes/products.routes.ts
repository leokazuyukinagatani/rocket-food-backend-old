import { Router } from "express";
import { ProductsController } from '../controllers/ProductsController'

const productsRoutes = Router()
const productsController = new ProductsController()


productsRoutes.post('/', productsController.create)
productsRoutes.delete('/:id', productsController.delete)
productsRoutes.put('/', productsController.update)
productsRoutes.get('/', productsController.index)
productsRoutes.get('/:id', productsController.show)



export {
  productsRoutes
}