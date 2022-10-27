import { Router } from "express";
import { FavoritesController } from '../controllers/FavoritesController'

const favoritesRoutes = Router()
const favoritesController = new FavoritesController()


// favoritesRoutes.post('/', favoritesController.create)
// favoritesRoutes.delete('/:id', favoritesController.delete)
// favoritesRoutes.get('/', favoritesController.index)



export {
  favoritesRoutes
}