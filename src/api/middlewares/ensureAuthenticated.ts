import { verify } from 'jsonwebtoken'
import { AppError } from '../utils/AppError'

import { authConfig } from '../configs/auth'
import { Request, Response, NextFunction } from 'express'

export function ensureAuthenticated( request:Request, response:Response, next:NextFunction) {
  const authHeader = request.headers.authorization

  if(!authHeader) {
    throw new AppError("JWT não informado!",401)  
  }

  const [,token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret)
    
    request.body.user = {
      id: Number(user_id)
    }
  } catch(error) {
    throw new AppError("Jwt inválido", 401)
  }

}