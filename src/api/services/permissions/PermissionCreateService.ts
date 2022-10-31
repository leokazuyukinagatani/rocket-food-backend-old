import { Permission } from "@prisma/client"
import { PermissionRepository } from "../../repositories/permissions/PermissionRepository"
import { AppError } from "../../utils/AppError"

interface PermissionRequest {
  name: string
  description: string
}

export class PermissionCreateService {
  repository:PermissionRepository
 
  constructor(repository:PermissionRepository) {
    this.repository = repository
  }
  async execute({ name, description }: PermissionRequest): Promise<Permission | Error> {

    const permissionExist = await this.repository.showByName(name)
    if(permissionExist){
      throw new AppError("Permission already exists",403)
    }

    const permission = await this.repository.create(name, description)
    
    return permission
  }
}