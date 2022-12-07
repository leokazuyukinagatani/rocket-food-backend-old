import { Permission, Role } from "@prisma/client";
import { prisma } from "../../database/prisma";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
}

interface IImage {
  filename: string;
  url: string;
}

interface IUserRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  image?: IImage;
}

export class UserRepository {
  async create({ name, email, password }: IUser) {
    const createdUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    return { id: createdUser.id };
  }

  async update({ id, name, email, password, image }: IUserRequest) {
    if (image) {
      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          password,
          updatedAt: new Date(),
          profile: {
            create: {
              ...image,
            },
          },
        },
      });
      return { id: updatedUser.id };
    } else {
      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          password,
          updatedAt: new Date(),
        },
      });
      return { id: updatedUser.id };
    }
  }

  async showByEmail(email: string) {
    const userResult = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return userResult;
  }

  async showById(id: string) {
    const userResult = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    return userResult;
  }

  async showByIdWithPermissions(id: string) {
    const userResult = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        permissions: {
          where: {
            userId: id,
          },
        },
      },
    });
    return userResult;
  }
  async showByIdWithRoles(id: string) {
    const userResult = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        roles: {
          where: {
            userId: id,
          },
        },
      },
    });
    return userResult;
  }

  async updateACL(
    id: string,
    permissionExists: Permission[],
    roleExists: Role[]
  ) {
    function permissionToPermissionId(permission: Permission) {
      const itemResponse = {
        permissionId: permission.id,
      };
      return itemResponse;
    }
    function roleToRoleIds(role: Role) {
      const itemResponse = {
        roleId: role.id,
      };
      return itemResponse;
    }

    const permissionsIds = permissionExists.map(permissionToPermissionId);
    const rolesIds = roleExists.map(roleToRoleIds);

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        permissions: {
          createMany: {
            data: permissionsIds,
          },
        },
        roles: {
          createMany: {
            data: rolesIds,
          },
        },
      },
    });

    return { id: updatedUser.id };
  }
}
