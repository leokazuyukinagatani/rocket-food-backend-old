import { IProduct, ProductRepository } from "../../repositories/products/ProductRepository"
import { AppError } from '../../utils/AppError'

export class ProductCreateService {
  repository:ProductRepository
 
  constructor(repository:ProductRepository) {
    this.repository = repository
  }

  async execute({ name, description, price, imageId }:IProduct) {
    if (!name) {
      throw new AppError('Product name is required.')
    }

    if (!description) {
      throw new AppError('Product description is required.')
    }

    if (!price) {
      throw new AppError('Product price is required.')
    }

    // if (!imageId) {
    //   throw new AppError('Imagem do produto é obrigatória.')
    // }

    const productWithName = await this.repository.showByName(name)

    if (productWithName) {
      throw new AppError('There is already a product registered with that name.')
    }

    const productCreatedId = await this.repository.create({ name, description, price, imageId })

    return productCreatedId
  }
}

