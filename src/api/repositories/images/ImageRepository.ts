import { prisma } from "../../database/prisma";

export interface IImage {
  id?: string;
  filename: string;
  url: string;
}
export class ImageRepository {
  async index() {
    const imagesResult = await prisma.image.findMany();

    return imagesResult;
  }

  async showById(id: string) {
    const imageResult = await prisma.image.findFirst({
      where: {
        id,
      },
    });
    return imageResult;
  }

  async showByName(filename: string) {
    // console.log('dentro do repository',name)
    console.log('tipo da entrada',typeof(filename))

    const imageResult = await prisma.image.findUnique({
      where: {
        filename: 'dadas',
      },
    });
    console.log('resposta do prisma',imageResult)

    return imageResult;
  }

  async create({ filename, url }: IImage) {
    const createdImage = await prisma.image.create({
      data: { filename, url},
    });

    return { id: createdImage.id };
  }

  async update({ id, filename, url }: IImage) {
    const updatedImage = await prisma.image.update({
      where: {
        id,
      },
      data: {
        filename,
        url,
      },
    });

    return updatedImage;
  }

  async upsert({filename, url}: IImage) {
    const upsertImage = await prisma.image.upsert({
      where: {
        filename
      },
      update: {
        url,
      },
      create: {
        filename,
        url,
      },
    });

    return upsertImage;
  }

  async delete(id: string) {
    const deletedImage = await prisma.image.delete({
      where: {
        id,
      },
    });

    return { id: deletedImage.id };
  }
}
