import { prisma } from "../../database/prisma";

export interface IIngredient {
  id?: string;
  name: string;
  description: string;
}
export class IngredientRepository {
  async index() {
    const ingredientsResult = await prisma.ingredient.findMany();

    return ingredientsResult;
  }

  async showById(id: string) {
    const ingredientResult = await prisma.ingredient.findFirst({
      where: {
        id,
      },
    });
    return ingredientResult;
  }

  async showByName(name: string) {
    const ingredientResult = await prisma.ingredient.findFirst({
      where: {
        name,
      },
    });

    return ingredientResult;
  }

  async create({ name, description }: IIngredient) {
    const createdIngredient = await prisma.ingredient.create({
      data: { name, description },
    });

    return { id: createdIngredient.id };
  }

  async update({ id, name, description }: IIngredient) {
    const updatedIngredient = await prisma.ingredient.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });

    return updatedIngredient;
  }

  async delete(id: string) {
    const deletedIngredient = await prisma.ingredient.delete({
      where: {
        id,
      },
    });

    return { id: deletedIngredient.id };
  }
}
