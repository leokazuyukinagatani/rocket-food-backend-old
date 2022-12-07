import { CategoryRepository } from "../../repositories/categories/CategoryRepository"

export class CategoryIndexService {
  repository:CategoryRepository
  constructor(repository:CategoryRepository) {
    this.repository = repository
  }

  async execute() {
    const categories = await this.repository.index()

    return categories
  }
}

