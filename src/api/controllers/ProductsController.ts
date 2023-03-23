import { Request, Response } from 'express'
import { IngredientRepository } from '../repositories/ingredients/IngredientRepository'
import {
  ProductRepository,
  IProduct,
} from '../repositories/products/ProductRepository'
import { IngredientCreateManyService } from '../services/ingredients/IngredientCreateManyService'
import { ProductCreateService } from '../services/products/ProductCreateService'
import { ProductDeleteService } from '../services/products/ProductDeleteService'
import { ProductIndexService } from '../services/products/ProductIndexService'
import { ProductShowService } from '../services/products/ProductShowService'
import { ProductUpdateService } from '../services/products/ProductUpdateService'

interface Ingredient {
  description: string
  name: string
  imageId: string | null
}

export interface Product {
  id?: string
  name: string
  description: string
  price: number
  imageId: string
  ingredients: Ingredient[]
}

interface IngredientInsert {
  product_id: string
  name: string
  description: string
}

export class ProductsController {
  async create(request: Request, response: Response) {
    const {
      name,
      description,
      price,
      imageId,
      ingredients,
    }: Product = request.body

    const productRepository = new ProductRepository()
    const productCreateService = new ProductCreateService(productRepository)
    const ingredientRepository = new IngredientRepository()
    const ingredientCreateManyService = new IngredientCreateManyService(
      ingredientRepository,
    )

    const { id: product_id } = await productCreateService.execute({
      name,
      description,
      price,
      imageId,
    })

    const ingredientInsert: IngredientInsert[] = ingredients.map(
      ({ name, description }) => {
        return {
          product_id,
          name,
          description,
        }
      },
    )

    await ingredientCreateManyService.execute(ingredientInsert)

    return response.status(201).json({ id: product_id })
  }

  async delete(request: Request, response: Response) {
    const { id } = request.query

    const productRepository = new ProductRepository()
    const productDeleteService = new ProductDeleteService(productRepository)

    await productDeleteService.execute(String(id))

    return response.status(200)
  }

  async show(request: Request, response: Response) {
    const { id } = request.query
    const productRepository = new ProductRepository()
    const productShowService = new ProductShowService(productRepository)

    const product = await productShowService.execute(String(id))

    return response.status(200).json(product)
  }

  async index(request: Request, response: Response) {
    const productRepository = new ProductRepository()
    const productIndexService = new ProductIndexService(productRepository)

    const products = await productIndexService.execute()

    return response.status(200).json(products)
  }

  async update(request: Request, response: Response) {
    const { id, name, description, price, imageId }: IProduct = request.body
    const productRepository = new ProductRepository()
    const productUpdateService = new ProductUpdateService(productRepository)

    await productUpdateService.execute({
      id,
      name,
      description,
      price,
      imageId,
    })

    return response.status(200)
  }
}
