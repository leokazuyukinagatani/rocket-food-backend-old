import { IngredientRepository } from "../../repositories/ingredients/IngredientRepository";
import { AppError } from "../../utils/AppError";

interface IngredientRequest {
  id?: string;
  description: string;
  name: string;
  imageId?: string | null;
}

export class IngredientCreateManyService {
  repository: IngredientRepository;

  constructor(repository: IngredientRepository) {
    this.repository = repository;
  }

  async execute(ingredients : IngredientRequest[]) {

    
    ingredients.map(async ({name, description}) => {
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
    } )
  
  }
}
