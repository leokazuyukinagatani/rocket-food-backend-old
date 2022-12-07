import { Role } from "@prisma/client";
import { prisma } from "../../database/prisma";

export class RoleRepository {
  async create(name: string, description: string) {
    const roleCreated = await prisma.role.create({
      data: {
        name,
        description,
      },
    });
    return { id: roleCreated.id };
  }
  async update(roleId: string, permissionsIds: { permissionId: string }[]) {
    const roleUpdated = await prisma.role.update({
      where: {
        id: roleId,
      },
      data: {
        permissions: {
          createMany: {
            data: permissionsIds,
          },
        },
      },
    });
    return { id: roleUpdated.id };
  }
  async showByName(name: string) {
    const role = await prisma.role.findFirst({
      where: {
        name,
      },
    });
    return role;
  }
  async showById(roleId: string) {
    const role = await prisma.role.findFirst({
      where: {
        id: roleId,
      },
    });
    return role;
  }
  async showByIds(rolesId: string[]) {
    let rolesResult: Role[] = [];

    for (let roleId of rolesId) {
      const result = await prisma.role.findFirst({
        where: {
          id: roleId,
        },
      });
      if (result) {
        rolesResult.push(result);
      }
    }
    return rolesResult;
  }
}
