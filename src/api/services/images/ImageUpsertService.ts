import {
  IImage,
  ImageRepository,
} from "../../repositories/images/ImageRepository";
import { AppError } from "../../utils/AppError";

export class ImageUpsertService {
  repository: ImageRepository;
  constructor(repository: ImageRepository) {
    this.repository = repository;
  }

  async execute({ filename, url }: IImage) {
  
   
    if (!filename) {
      throw new AppError("Image name is required.");
    }

    if (typeof filename != "string") {
      throw new AppError("Image name should be a string.");
    }

    if (!url) {
      throw new AppError("Image url is required.");
    }

    if (typeof url != "string") {
      throw new AppError("Image url should be a string.");
    }


  

    const upsertImage = await this.repository.upsert({
      filename,
      url
    });

    return upsertImage;
  }
}
