import { Permission } from "@prisma/client";
import { prisma } from "../../database/prisma";

export class PermissionRepository {
  async create(name: string, description: string) {
    const newPermission = await prisma.permission.create({
      data: {
        name,
        description,
      },
    });
    return newPermission;
  }

  async showByName(name: string) {
    const permission = await prisma.permission.findFirst({
      where: {
        name,
      },
    });

    return permission;
  }

  async showByIds(permissions: string[]) {
    let permissionsResult: Permission[] = [];

    for (let permission of permissions) {
      const result = await prisma.permission.findFirst({
        where: {
          id: permission,
        },
      });
      if (result) {
        permissionsResult.push(result);
      }
    }

    return permissionsResult;
  }

  async showById(id: string) {
    let permissionResult = await prisma.permission.findFirst({
      where: {
        id,
      },
    });

    return permissionResult;
  }
}
