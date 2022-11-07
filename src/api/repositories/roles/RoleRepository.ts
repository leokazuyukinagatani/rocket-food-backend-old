import { Role } from "@prisma/client";
import { prisma } from "../../database/prisma";
import { AppError } from "../../utils/AppError";

export class RoleRepository {
  async create(name: string, description: string) {
    try {
      const role = await prisma.role.create({
        data: {
          name,
          description,
        },
      });
      return role;
    } catch (error) {
      throw new AppError('Não foi possivel criar a role')
    }
  }

  async showByName(name: string) {
    try {
      const role = await prisma.role.findFirst({
        where: {
          name,
        },
      });
      return role;
    } catch (error) {
      console.log(error);
    }
  }

  async showByIds(roles: Role[]) {
    let rolesResult = [];
    try {
      for (let role of roles) {
        const result = await prisma.role.findFirst({
          where: {
            id: role.id,
          },
        });
        if (result) {
          rolesResult.push(result);
        }
      }
      return rolesResult;
    } catch (error) {
      console.log(error)
    }
  }
}
