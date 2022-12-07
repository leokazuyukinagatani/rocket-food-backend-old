import { ProductRepository } from "../../repositories/products/ProductRepository";
import { AppError } from "../../utils/AppError";

export class ProductDeleteService {
  repository: ProductRepository;

  constructor(repository: ProductRepository) {
    this.repository = repository;
  }

  async execute(product_id: string) {
    if (!product_id) {
      throw new AppError("Product id is required.");
    }

    if (typeof product_id != "string") {
      throw new AppError("Product id should be a string.");
    }

    const deletedItem = await this.repository.delete(product_id);

    return { id: deletedItem.id };
  }
}
