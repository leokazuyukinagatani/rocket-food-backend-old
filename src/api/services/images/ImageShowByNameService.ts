import { ImageRepository } from "../../repositories/images/ImageRepository";
import { AppError } from "../../utils/AppError";

export class ImageShowByNameService {
  repository: ImageRepository;

  constructor(repository: ImageRepository) {
    this.repository = repository;
  }

  async execute(filename: string) {
    if (!filename) {
      throw new AppError("Image filename is required.");
    }

    if (typeof filename != "string" || filename === " ") {
      throw new AppError("Image filename should be a String.");
    }

    const image = await this.repository.showByName(filename);

    return image;
  }
}
