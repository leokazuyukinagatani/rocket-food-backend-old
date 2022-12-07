import { ProductRepository } from "../../repositories/products/ProductRepository"
import { AppError } from "../../utils/AppError"

export class ProductShowService {
  repository:ProductRepository

  constructor(repository:ProductRepository) {
    this.repository = repository
  }

  async execute(product_id: String) {
    if (!product_id) {
      throw new AppError('Product id is required.')
    }


    if (typeof product_id != 'string' || product_id === ' ') {
      throw new AppError('Product id should be a String.')
    }

    const product = await this.repository.showById(product_id)

    if (!product) {
      throw new AppError('Product not found.')
    }

    return product
  }
}

