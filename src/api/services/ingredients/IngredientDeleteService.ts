import { IngredientRepository } from '../../repositories/ingredients/IngredientRepository'
import { AppError } from '../../utils/AppError'

export class IngredientDeleteService {
  repository:IngredientRepository

  constructor(repository:IngredientRepository) {
    this.repository = repository
  }

  async execute(ingredient_id:string) {
    if (!ingredient_id) {
      throw new AppError('ingredient id is required.')
    }

    if (typeof ingredient_id != 'string') {
      throw new AppError('ingredient id should be a string.')
    }

    const deletedItem = await this.repository.delete(ingredient_id)

    return { id: deletedItem.id }
  }
}

