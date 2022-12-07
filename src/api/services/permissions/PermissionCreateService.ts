import { Permission } from "@prisma/client";
import { PermissionRepository } from "../../repositories/permissions/PermissionRepository";
import { AppError } from "../../utils/AppError";

interface PermissionRequest {
  name: string;
  description: string;
}

export class PermissionCreateService {
  repository: PermissionRepository;

  constructor(repository: PermissionRepository) {
    this.repository = repository;
  }
  async execute({ name, description }: PermissionRequest): Promise<Permission> {
    const permissionExist = await this.repository.showByName(name);
    if (permissionExist) {
      throw new AppError("Permission already exists", 403);
    }

    try {
      const createdPermission = await this.repository.create(name, description);
      return createdPermission;
    } catch (error) {
      throw new AppError("Unable to create a new role");
    }
  }
}
