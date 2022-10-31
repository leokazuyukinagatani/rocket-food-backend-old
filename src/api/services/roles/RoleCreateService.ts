import { Role } from "@prisma/client"
import { RoleRepository } from "../../repositories/roles/RoleRepository"
import { AppError } from "../../utils/AppError"

interface RoleRequest {
  name: string
  description: string
  userId: string
}

export class RoleCreateService {
  repository:RoleRepository
 
  constructor(repository:RoleRepository) {
    this.repository = repository
  }
  async execute({name, description, userId }: RoleRequest): Promise<Role | Error> {

    const roleExist = await this.repository.showByName(name)
    if(roleExist){
      throw new AppError("Role already exists")
    }

    const role = await this.repository.create(name, description, userId)
    
    return role
  }
}