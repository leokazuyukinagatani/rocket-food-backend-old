import { Request, Response } from "express";
import { UserRepository } from '../repositories/users/UserRepository'
import { UserCreateService } from '../services/users/UserCreateService'
import { UserShowService } from '../services/users/UserShowService'

export class UsersController {
  async create( request:Request, response:Response){
    const { name, email, password, passwordConfirm } = request.body

    const userRepository = new UserRepository()
    const userCreateService = new UserCreateService(userRepository)

   
    const id  = await userCreateService.execute({ name, email, password, passwordConfirm })

    return response.status(201).json({ id })
  }
  async show( request:Request, response:Response) {
    const { email } = request.body
    
    const userRepository = new UserRepository()
    const userShowService = new UserShowService(userRepository)

    const user = await userShowService.execute(email)

    return response.status(200).json({user})
  }
}


