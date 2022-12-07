import { PermissionRepository } from "../../repositories/permissions/PermissionRepository";

export class PermissionShowService {
  repository: PermissionRepository;

  constructor(repository: PermissionRepository) {
    this.repository = repository;
  }

  async execute(permissionsId: string[]) {
    const permissions = await this.repository.showByIds(permissionsId);

    return permissions;
  }
}
