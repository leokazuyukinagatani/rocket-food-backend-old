import { Router } from "express";
import { IngredientsController } from "../controllers/IngredientsController";

const ingredientsRoutes = Router();
const ingredientsController = new IngredientsController();

/*ingredientsRoutes.post('/', ingredientsController.create)
ingredientsRoutes.delete('/:id', ingredientsController.delete)
ingredientsRoutes.put('/', ingredientsController.update)
ingredientsRoutes.get('/', ingredientsController.index)
ingredientsRoutes.get('/:id', ingredientsController.show) */

export { ingredientsRoutes };
