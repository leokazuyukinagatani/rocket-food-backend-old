import { Permission } from '@prisma/client'
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

  async showByIds(permissions:Permission[]) {

    let permissionsResult

    for(let permission of permissions ){
      const result = await prisma.permission.findFirst({
        where: {
          id: permission.id
        }
      })
      if(result){
        permissions.push(permission)
      }
    }    
   
    return permissionsResult
  }

  async showById(id:string) {
    let permissionResult = await prisma.permission.findFirst({
      where: {
        id
      }
    })

    return permissionResult
  }
}