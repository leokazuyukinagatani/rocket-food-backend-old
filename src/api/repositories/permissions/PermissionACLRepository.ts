import { prisma } from '../../database/prisma'


export class PermissionACLRepository {
  async create( userId:string, permissionId:string ) {
    const permissionACL = await prisma.usersOnPermissions.create({
      data: {
        userId,
        permissionId,
      }
    })
    return permissionACL
  }

}