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

    const createdIngredient = await this.repository.create({
      name,
      description,
    });

    if (!createdIngredient) {
      throw new AppError("Unable to create a new Ingredient");
    }

    return createdIngredient;
  }
}
