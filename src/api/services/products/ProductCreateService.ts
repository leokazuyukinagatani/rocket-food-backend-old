import { IProduct, ProductRepository } from "../../repositories/products/ProductRepository"
import { AppError } from '../../utils/AppError'

export class ProductCreateService {
  repository:ProductRepository
 
  constructor(repository:ProductRepository) {
    this.repository = repository
  }

  async execute({ name, description, price, imageId }:IProduct) {
    if (!name) {
      throw new AppError('Nome do produto é obrigatório.')
    }

    if (!description) {
      throw new AppError('Descrição do produto é obrigatória.')
    }

    if (!price) {
      throw new AppError('Preço do produto é obrigatório.')
    }

    // if (!imageId) {
    //   throw new AppError('Imagem do produto é obrigatória.')
    // }

    const productWithName = await this.repository.findByName(name)

    if (productWithName) {
      throw new AppError('Já existe um produto cadastrado com esse nome.')
    }

    const productCreatedId = await this.repository.create({ name, description, price, imageId })

    return productCreatedId
  }
}

