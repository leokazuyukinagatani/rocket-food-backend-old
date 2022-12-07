import { Request, Response, NextFunction } from "express";
import { PermissionRepository } from "../repositories/permissions/PermissionRepository";
import { RoleRepository } from "../repositories/roles/RoleRepository";
import { UserRepository } from "../repositories/users/UserRepository";
import { AppError } from "../utils/AppError";

export function can(permissionsRoutes: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.body.user;
    const userRepository = new UserRepository();
    const permissionRepository = new PermissionRepository();

    const user = await userRepository.showByIdWithPermissions(id);

    if (!user) {
      return response.status(400).json("Usuario não existente");
    }

    const permissionsIds = user.permissions.map(
      (permission) => permission.permissionId
    );
    const permissions = await permissionRepository.showByIds(permissionsIds);

    const permissionExists = permissions
      .map((permission) => permission.name)
      .some((permission) => permissionsRoutes.includes(permission));
    if (!permissionExists) {
      return response.status(401).end();
    }

    return next();
  };
}

export function is(rolesRoutes: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.body.user;
    const userRepository = new UserRepository();
    const roleRepository = new RoleRepository();

    const user = await userRepository.showByIdWithRoles(id);

    if (!user) {
      return response.status(400).json("Usuario não existente");
    }

    const rolesIds = user.roles.map((role) => role.roleId);
    const roles = await roleRepository.showByIds(rolesIds);

    if (!roles) {
      throw new AppError("Não foi possivel encontrar as roles");
    }
    const roleExists = roles
      .map((role) => role.name)
      .some((role) => rolesRoutes.includes(role));

    if (!roleExists) {
      return response.status(401).end();
    }

    return next();
  };
}
