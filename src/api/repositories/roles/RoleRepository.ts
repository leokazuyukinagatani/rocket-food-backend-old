import { Role } from "@prisma/client";
import { prisma } from "../../database/prisma";

export class RoleRepository {
  async create(name: string, description: string) {
    const createdRole = await prisma.role.create({
      data: {
        name,
        description,
      },
    });
    return { id: createdRole.id };
  }
  async update(roleId: string, permissionsIds: { permissionId: string }[]) {
    const updatedRole = await prisma.role.update({
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
    return { id: updatedRole.id };
  }
  async showByName(name: string) {
    const roleResult = await prisma.role.findFirst({
      where: {
        name,
      },
    });
    return roleResult;
  }
  async showById(roleId: string) {
    const roleResult = await prisma.role.findFirst({
      where: {
        id: roleId,
      },
    });
    return roleResult;
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
