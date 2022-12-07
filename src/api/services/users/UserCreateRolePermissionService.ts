import { Role } from "@prisma/client";
import { PermissionRepository } from "../../repositories/permissions/PermissionRepository";
import { RoleRepository } from "../../repositories/roles/RoleRepository";
import { UserRepository } from "../../repositories/users/UserRepository";

interface RolePermissionRequest {
  roleId: string[];
  permissions: string[];
}

export class CreateRolePermissionService {
  userRepository: UserRepository;
  roleRepository: RoleRepository;
  permissionRepository: PermissionRepository;

  constructor(
    userRepository: UserRepository,
    roleRepository: RoleRepository,
    permissionRepository: PermissionRepository
  ) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.permissionRepository = permissionRepository;
  }

  async execute({ roleId, permissions }: RolePermissionRequest) {
    // await this.roleRepository.showByIds(roleId)
    // await this.userRepository.showById(user.id)
    // await this.permissionRepository.showById(permissions)
  }
}
