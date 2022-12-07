import {
  IProduct,
  ProductRepository,
} from "../../repositories/products/ProductRepository";
import { AppError } from "../../utils/AppError";

export class ProductUpdateService {
  repository: ProductRepository;
  constructor(repository: ProductRepository) {
    this.repository = repository;
  }

  async execute({ id, name, description, price, imageId }: IProduct) {
    if (!id) {
      throw new AppError("Product id is required.");
    }

    if (typeof id != "string") {
      throw new AppError("Product id should be a string.");
    }

    const product = await this.repository.showById(id);

    if (!product) {
      throw new AppError("Product not found.");
    }

    if (!name) {
      throw new AppError("Product name is required.");
    }

    if (typeof name != "string") {
      throw new AppError("Product name should be a string.");
    }

    if (!description) {
      throw new AppError("Product description is required.");
    }

    if (typeof description != "string") {
      throw new AppError("Product description should be a string.");
    }

    if (!price) {
      throw new AppError("Product price is required.");
    }

    if (typeof price != "number") {
      throw new AppError("Product price should be a number.");
    }

    if (!imageId) {
      throw new AppError("Product image is required.");
    }

    const productWithName = await this.repository.showByName(name);

    if (productWithName && productWithName.id != id) {
      throw new AppError(
        "There is already a product registered with that name."
      );
    }

    const productUpdated = await this.repository.update({
      id,
      name,
      description,
      price,
      imageId,
    });

    return productUpdated;
  }
}
