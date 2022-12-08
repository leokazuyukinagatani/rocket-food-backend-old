import { ImageRepository } from "../../repositories/images/ImageRepository";

export class ImageIndexService {
  repository: ImageRepository;
  constructor(repository: ImageRepository) {
    this.repository = repository;
  }

  async execute() {
    const imagesResult = await this.repository.index();

    return imagesResult;
  }
}
