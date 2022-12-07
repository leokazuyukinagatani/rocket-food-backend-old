import { prisma } from "../../database/prisma";

export interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  imageId: string;
}
export class ProductRepository {
  async index() {
    const productsResult = await prisma.product.findMany();

    return productsResult;
  }

  async showById(id: string) {
    const productResult = await prisma.product.findFirst({
      where: {
        id,
      },
    });
    return productResult;
  }

  async showByName(name: string) {
    const productResult = await prisma.product.findFirst({
      where: {
        name,
      },
    });

    return productResult;
  }

  async create({ name, description, price, imageId }: IProduct) {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageId,
      },
    });

    return { id: newProduct.id };
  }

  async update({ id, name, description, price }: IProduct) {
    const productUpdated = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
      },
    });

    return { id: productUpdated.id };
  }

  async delete(id: string) {
    const deletedProduct = await prisma.product.delete({
      where: {
        id,
      },
    });

    return { id: deletedProduct.id };
  }
}
