import { User } from "@prisma/client";
import { PermissionRepository } from "../../repositories/permissions/PermissionRepository";
import { RoleRepository } from "../../repositories/roles/RoleRepository";
import { UserRepository } from "../../repositories/users/UserRepository";
import { AppError } from "../../utils/AppError";
import { PermissionShowService } from "../permissions/PermissionShowService";
import { RoleShowService } from "../roles/RoleShowService";
import { UserShowService } from "../users/UserShowService";

interface UserACLRequest {
  userId: string
  roles: string[]
  permissions: string[]
}

export class ACLCreateUserAccessControlListService {
  userRepository: UserRepository
  permissionRepository: PermissionRepository
  roleRepository: RoleRepository

  constructor(userRepository:UserRepository, permissionRepository:PermissionRepository, roleRepository:RoleRepository){
    this.userRepository = userRepository
    this.permissionRepository = permissionRepository
    this.roleRepository = roleRepository
  
  }
  
  async execute({userId, roles, permissions}:UserACLRequest): Promise<User | AppError> {
    const userShowService = new UserShowService(this.userRepository) 
    const user = await userShowService.execute(userId)
    
    if(!user) {
      return new AppError('O usuário não existe')
    }

    const permissionShowService = new PermissionShowService(this.permissionRepository)
    const permissionExists = await permissionShowService.execute(permissions)

    const roleShowService = new RoleShowService(this.roleRepository)
    const roleExists = await roleShowService.execute(roles)


    await this.userRepository.updateACL(user, permissionExists, roleExists)

  
    
    return user

  }
}