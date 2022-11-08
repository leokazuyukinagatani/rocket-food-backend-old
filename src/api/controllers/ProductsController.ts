import { Request, Response } from "express";
import { ProductRepository, IProduct } from '../repositories/products/ProductRepository'
import { ProductCreateService } from '../services/products/ProductCreateService'
import { ProductDeleteService } from "../services/products/ProductDeleteService";
import { ProductIndexService } from "../services/products/ProductIndexService";
import { ProductShowService } from "../services/products/ProductShowService";
import { ProductUpdateService } from "../services/products/ProductUpdateService";

export class ProductsController {

  async create( request:Request, response:Response){
    const { name, description, price, imageId }:IProduct = request.body

    const productRepository = new ProductRepository()
    const productCreateService = new ProductCreateService(productRepository)

  
    const { id } = await productCreateService.execute({ name, description, price, imageId });

    return response.status(201).json({ id })
  }

  async delete( request:Request, response:Response ){
    const { id }  = request.query

    const productRepository = new ProductRepository()
    const productDeleteService = new ProductDeleteService(productRepository)

    await productDeleteService.execute(String(id))

    return response.status(200)
  }

  async show( request:Request, response:Response ){
    
    const { id } = request.query
    const productRepository = new ProductRepository()
    const productShowService = new ProductShowService(productRepository)

    const product = await productShowService.execute(String(id))

    return response.status(200).json(product)
  }

  async index( request:Request, response:Response ){
    const productRepository = new ProductRepository()
    const productIndexService = new ProductIndexService(productRepository)

    const products = await productIndexService.execute()

    return response.status(200).json(products)
  }

  async update( request:Request, response:Response ){
    const { id, name, description, price, imageId }:IProduct = request.body
    const productRepository = new ProductRepository()
    const productUpdateService = new ProductUpdateService(productRepository)

    await productUpdateService.execute({ id, name, description, price, imageId })

    return response.status(200)
  }


}

