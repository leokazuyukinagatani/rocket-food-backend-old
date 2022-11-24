import { PermissionRepository } from "../repositories/permissions/PermissionRepository";
import { RoleRepository } from "../repositories/roles/RoleRepository";
import { ACLCreateRolePermissionService } from "../services/acls/ACLCreateRolePermissionService";
import { Request, Response } from "express";
import { AppError } from "../utils/AppError";

export class RolePermissionCreateController {
  async create(request: Request, response: Response) {
    const { roleId } = request.params;
    const { permissions } = request.body;

    const permissionRepository = new PermissionRepository();
    const roleRepository = new RoleRepository();
    const rolePermissionsACL = new ACLCreateRolePermissionService(
      permissionRepository,
      roleRepository
    );

    const result = rolePermissionsACL.execute({ roleId, permissions });

    if (result instanceof AppError) {
      return response.status(result.statusCode).json(result.message);
    }
    return response.status(201).json({ result });
  }
}
