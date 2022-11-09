import { Role } from "@prisma/client";
import { prisma } from "../../database/prisma";

export class RoleRepository {
  async create(name: string, description: string) {
    const role = await prisma.role.create({
      data: {
        name,
        description,
      },
    });
    return role;
  }

  async showByName(name: string) {
    const role = await prisma.role.findFirst({
      where: {
        name,
      },
    });
    return role;
  }

  async showByIds(roles: string[]) {
    let rolesResult:Role[] = [];

    for (let role of roles) {
      const result = await prisma.role.findFirst({
        where: {
          id: role,
        },
      });
      if (result) {
        rolesResult.push(result);
      }

      return rolesResult;
    }
  }
}
