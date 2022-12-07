import { IngredientRepository } from "../../repositories/ingredients/IngredientRepository";
import { AppError } from "../../utils/AppError";

interface IngredientRequest {
  id?: string;
  description: string;
  name: string;
  imageId?: string | null;
}

export class IngredientCreateService {
  repository: IngredientRepository;

  constructor(repository: IngredientRepository) {
    this.repository = repository;
  }

  async execute({ name, description }: IngredientRequest) {
    const ingredientExist = await this.repository.showByName(name);
    if (ingredientExist) {
      throw new AppError("Ingredient already exists", 403);
    }

    try {
      const response = await this.repository.create({
        name,
        description,
      });
      return response;
    } catch (error) {
      throw new AppError("Unable to create a new Ingredient");
    }
  }
}
