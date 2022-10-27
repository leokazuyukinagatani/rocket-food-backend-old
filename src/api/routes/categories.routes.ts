import { Router } from "express";
import { CategoriesController } from '../controllers/CategoriesController'

const categoriesRoutes = Router()
const categoriesController = new CategoriesController()


// categoriesRoutes.post('/', categoriesController.create)
// categoriesRoutes.delete('/:id', categoriesController.delete)
// categoriesRoutes.put('/', categoriesController.update)
// categoriesRoutes.get('/', categoriesController.index)



export {
  categoriesRoutes
}