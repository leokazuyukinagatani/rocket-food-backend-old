import {
  IIngredient,
  IngredientRepository,
} from "../../repositories/ingredients/IngredientRepository";
import { AppError } from "../../utils/AppError";

export class IngredientUpdateService {
  repository: IngredientRepository;
  constructor(repository: IngredientRepository) {
    this.repository = repository;
  }

  async execute({ id, name, description }: IIngredient) {
    if (!id) {
      throw new AppError("Ingredient id is required.");
    }

    if (typeof id != "string") {
      throw new AppError("Ingredient id should be a string.");
    }

    const ingredient = await this.repository.showById(id);

    if (!ingredient) {
      throw new AppError("Ingredient not found.");
    }

    if (!name) {
      throw new AppError("Ingredient name is required.");
    }

    if (typeof name != "string") {
      throw new AppError("Ingredient name should be a string.");
    }

    if (!description) {
      throw new AppError("Ingredient description is required.");
    }

    if (typeof description != "string") {
      throw new AppError("Ingredient description should be a string.");
    }


    const ingredientWithName = await this.repository.showByName(name);

    if (ingredientWithName && ingredientWithName.id != id) {
      throw new AppError(
        "There is already a ingredient registered with that name."
      );
    }

    const updatedIngredient = await this.repository.update({
      id,
      name,
      description
    });

    return updatedIngredient;
  }
}
