import { ProductRepository } from "../../repositories/products/ProductRepository";

export class ProductIndexService {
  repository: ProductRepository;
  constructor(repository: ProductRepository) {
    this.repository = repository;
  }

  async execute() {
    const productsResult = await this.repository.index();

    return productsResult;
  }
}
