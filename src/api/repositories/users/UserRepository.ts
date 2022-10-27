import { prisma } from '../../database/prisma'
export interface IUser {
  name: string
  email: string
  password: string
}
export class UserRepository {

  async create({ name, email, password }:IUser) {
   
    
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password
      }
    })

    return newUser
  }

  async findByEmail(email:string) {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    return user
  } 
}
