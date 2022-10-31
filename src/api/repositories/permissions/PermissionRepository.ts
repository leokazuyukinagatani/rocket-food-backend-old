import { prisma } from '../../database/prisma'

export class PermissionRepository {
  async create(name:string, description:string) {
    const permission = await prisma.permission.create({
      data: {
        name,
        description
      }
    })
    return permission
  }

  async showByName(name:string) {
    const permission = await prisma.permission.findFirst({
      where: {
        name
      }
    })
    return permission
  }
}