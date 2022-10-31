import { Request, Response } from 'express'
// import { ImageRepository } from '../repositories/images/ImageRepository'

export class ImagesController {

   async create( request:Request, response:Response){
    
    // const { name, description, price }:IImage = request.body

    // const imageRepository = new ImageRepository()
    // const imageCreateService = new ImageCreateService(imageRepository)

    // const image_id = ''
    // const { id } = await imageCreateService.execute({ name, description, price, image_id });

    // return response.status(201).json({ id })
  }

  async delete( request:Request, response:Response ){
    
    return response.json()

  }

  async show( request:Request, response:Response ){
    
    return response.json()

  }

  async index( request:Request, response:Response ){
    
    return response.json()

  }

  async update( request:Request, response:Response ){
    
    return response.json()

  }


}