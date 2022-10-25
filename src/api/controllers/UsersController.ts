import { Request, Response } from "express";
import { AppError } from "../utils/AppError";

class UsersController {
  async create( request:Request, response:Response){
    console.log('aqui')
  }

}

export {
  UsersController
}