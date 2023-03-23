import { ImageRepository } from "../../repositories/images/ImageRepository";
import { AppError } from "../../utils/AppError";

interface ImageRequest {
  id?: string;
  filename: string;
  url: string;
}

export class ImageCreateService {
  repository: ImageRepository;

  constructor(repository: ImageRepository) {
    this.repository = repository;
  }

  async execute({ filename, url }: ImageRequest) {
    // console.log(filename, url ,'dentro do service')
    console.log('dentro do service', filename, url)
    console.log(typeof(filename))
    const imageExist = await this.repository.showByName(filename);
    // console.log('response of repository image',imageExist)
    // console.log(imageExist, 'encontrou uma imagem')
    if (imageExist) {
      throw new AppError("Image already exists", 403);
    }

    const createdImage = await this.repository.create({
      filename,
      url,
    });

    if (!createdImage) {
      throw new AppError("Unable to create a new Image");
    }

    return createdImage;
  }
}
