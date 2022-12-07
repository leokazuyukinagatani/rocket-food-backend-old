import { PermissionRepository } from "../../repositories/permissions/PermissionRepository";

export class PermissionShowService {
  repository: PermissionRepository;

  constructor(repository: PermissionRepository) {
    this.repository = repository;
  }

  async execute(permissionsId: string[]) {
    const permissionsResult = await this.repository.showByIds(permissionsId);

    return permissionsResult;
  }
}
