import {
  IImage,
  ImageRepository,
} from "../../repositories/images/ImageRepository";
import { AppError } from "../../utils/AppError";

export class ImageUpdateService {
  repository: ImageRepository;
  constructor(repository: ImageRepository) {
    this.repository = repository;
  }

  async execute({ id, filename, url }: IImage) {
    if (!id) {
      throw new AppError("Image id is required.");
    }

    if (typeof id != "string") {
      throw new AppError("Image id should be a string.");
    }

    const image = await this.repository.showById(id);

    if (!image) {
      throw new AppError("Image not found.");
    }

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


    const imageWithName = await this.repository.showByName(filename);

    if (imageWithName && imageWithName.id != id) {
      throw new AppError(
        "There is already a image registered with that name."
      );
    }

    const updatedImage = await this.repository.update({
      id,
      filename,
      url
    });

    return updatedImage;
  }
}
