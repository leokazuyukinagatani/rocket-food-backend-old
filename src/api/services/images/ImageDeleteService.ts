import { ImageRepository } from "../../repositories/images/ImageRepository";
import { AppError } from "../../utils/AppError";

export class ImageDeleteService {
  repository: ImageRepository;

  constructor(repository: ImageRepository) {
    this.repository = repository;
  }

  async execute(image_id: string) {
    if (!image_id) {
      throw new AppError("Image id is required.");
    }

    if (typeof image_id != "string") {
      throw new AppError("Image id should be a string.");
    }

    const deletedImage = await this.repository.delete(image_id);

    return { id: deletedImage.id };
  }
}
