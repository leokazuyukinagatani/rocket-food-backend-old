import { prisma } from "../../database/prisma";

export class PermissionACLRepository {
  async create(userId: string, permissionId: string) {
    const createdPermissionACL = await prisma.usersOnPermissions.create({
      data: {
        userId,
        permissionId,
      },
    });
    return createdPermissionACL;
  }
}
