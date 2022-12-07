import { RoleRepository } from "../../repositories/roles/RoleRepository";

export class RoleShowService {
  repository: RoleRepository;

  constructor(repository: RoleRepository) {
    this.repository = repository;
  }

  async execute(rolesId: string[]) {
    const roles = await this.repository.showByIds(rolesId);

    return roles;
  }
}
