import { prisma } from '../../database/prisma'


export class PermissionACLRepository {
  async create( userId:string, permissionId:string ) {
    const newPermissionACL = await prisma.usersOnPermissions.create({
      data: {
        userId,
        permissionId,
      }
    })
    return newPermissionACL
  }

}