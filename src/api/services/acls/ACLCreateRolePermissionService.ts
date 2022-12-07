import { Permission, Role } from "@prisma/client";
import { PermissionRepository } from "../../repositories/permissions/PermissionRepository";
import { RoleRepository } from "../../repositories/roles/RoleRepository";
import { AppError } from "../../utils/AppError";
import { PermissionShowService } from "../permissions/PermissionShowService";

interface IRolePermissionRequest {
  roleId: string;
  permissions: string[];
}

export class ACLCreateRolePermissionService {
  permissionRepository: PermissionRepository;
  roleRepository: RoleRepository;

  constructor(
    permissionRepository: PermissionRepository,
    roleRepository: RoleRepository
  ) {
    this.permissionRepository = permissionRepository;
    this.roleRepository = roleRepository;
  }
  async execute({
    roleId,
    permissions,
  }: IRolePermissionRequest): Promise<Role | AppError> {
    const permissionShowService = new PermissionShowService(
      this.permissionRepository
    );

    const permissionExists = await permissionShowService.execute(permissions);

    function permissionIds(item: Permission) {
      const permissionId = item.id;
      const itemResponse = {
        permissionId,
      };
      return itemResponse;
    }

    const permissionsIds = permissionExists.map(permissionIds);

    const roleExist = await this.roleRepository.showById(roleId);

    if (!roleExist) {
      throw new AppError("A role não existe");
    }
    const role = await this.roleRepository.update(roleExist.id, permissionsIds);
    return role;
  }
}
