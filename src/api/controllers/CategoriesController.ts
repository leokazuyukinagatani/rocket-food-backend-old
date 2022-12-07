import { Request, Response } from "express";
import { CategoryRepository } from "../repositories/categories/CategoryRepository";
import { CategoryCreateService } from "../services/categories/CategoryCreateService";
import { CategoryIndexService } from "../services/categories/CategoryIndexService";

export class CategoriesController {

  async create(request: Request, response:Response) {
    const { name, description } = request.body

    const categoryRepository = new CategoryRepository()
    const categoryCreateService = new CategoryCreateService(categoryRepository) 

    const result = await categoryCreateService.execute({name, description})

    if(result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.status(201).json(result)
  }

  async delete( request:Request, response:Response ){

    return console.log("not implement")

  }

  async show( request:Request, response:Response ){
    
    return console.log("not implement")

  }

  async index( request:Request, response:Response ){
    const categoryRepository = new CategoryRepository()
    const categoryIndexService = new CategoryIndexService(categoryRepository)

    const categories = await categoryIndexService.execute()

    return response.status(200).json(categories)
  }

  async update( request:Request, response:Response ){

    return console.log("not implement")

  }


}

