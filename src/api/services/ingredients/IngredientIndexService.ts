import { IngredientRepository } from "../../repositories/ingredients/IngredientRepository";

export class IngredientIndexService {
  repository: IngredientRepository;
  constructor(repository: IngredientRepository) {
    this.repository = repository;
  }

  async execute() {
    const ingredients = await this.repository.index();
 
    return ingredients;
  }
}
