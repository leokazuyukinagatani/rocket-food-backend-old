import { prisma } from "../../database/prisma";

export interface ICategoryRepository {
  name: string;
  description: string;
}
export class CategoryRepository {
  async create({ name, description }: ICategoryRepository) {
    const createdCategory = await prisma.category.create({
      data: {
        name,
        description,
      },
    });
    return createdCategory;
  }

  async showByName(name: string) {
    const categoryResult = await prisma.category.findFirst({
      where: {
        name,
      },
    });
    return categoryResult;
  }

  async index() {
    const categoriesResult = await prisma.category.findMany();

    return categoriesResult;
  }
}
