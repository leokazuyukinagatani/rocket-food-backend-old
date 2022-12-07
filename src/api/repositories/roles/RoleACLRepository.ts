import { prisma } from "../../database/prisma";

export class RoleACLRepository {
  async create(userId: string, roleId: string) {
    const roleACLResult = await prisma.usersOnRoles.create({
      data: {
        userId,
        roleId,
      },
    });
    return roleACLResult;
  }
}
