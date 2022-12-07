import { prisma } from "../../database/prisma";

export class CategoryRepository {
  async create(name: string, description: string) {
    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    });
    return category;
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
