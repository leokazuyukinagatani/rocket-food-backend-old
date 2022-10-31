import { prisma } from '../../database/prisma'

export class RoleRepository {
  async create(name:string, description:string, userId:string) {
    const role = await prisma.role.create({
      data: {
        name,
        description,
        userId
      }
    })
    return role
  }

  async showByName(name:string) {
    const role = await prisma.role.findFirst({
      where: {
        name
      }
    })
    return role
  }
}