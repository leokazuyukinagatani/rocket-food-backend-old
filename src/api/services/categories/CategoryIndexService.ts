import { CategoryRepository } from "../../repositories/categories/CategoryRepository";

export class CategoryIndexService {
  repository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async execute() {
    const categoriesResult = await this.repository.index();

    return categoriesResult;
  }
}
