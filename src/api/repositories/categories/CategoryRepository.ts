import { prisma } from "../../database/prisma";

export interface ICategoryRepository {
  name: string;
  description: string;
}
export class CategoryRepository {
  async create({ name, description }: ICategoryRepository) {
    const newCategory = await prisma.category.create({
      data: {
        name,
        description,
      },
    });
    return newCategory;
  }

  async showByName(name: string) {
    const category = await prisma.category.findFirst({
      where: {
        name,
      },
    });
    return category;
  }

  async index() {
    const categories = await prisma.category.findMany();

    return categories;
  }
}
