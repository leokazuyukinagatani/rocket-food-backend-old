import { Role } from "@prisma/client";
import { RoleRepository } from "../../repositories/roles/RoleRepository";
import { AppError } from "../../utils/AppError";

interface RoleRequest {
  name: string;
  description: string;
}

export class RoleCreateService {
  repository: RoleRepository;

  constructor(repository: RoleRepository) {
    this.repository = repository;
  }
  async execute({ name, description }: RoleRequest): Promise<{id: string} | AppError> {
    const roleExist = await this.repository.showByName(name);
    if (roleExist) {
      throw new AppError("Role already exists", 403);
    }

    const roleResult = await this.repository.create(name, description);
    if (!roleResult) {
      throw new AppError("Failed to create a new role");
    }
    return roleResult;
  }
}
