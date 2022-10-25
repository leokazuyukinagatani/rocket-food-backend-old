import { prisma } from '../../database/prisma'
interface IRequest {
  name: string
  email: string
  password: string
}
class UserRepository {

  async create({ name, email, password }:IRequest) {
   
    
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

export {
  UserRepository
}