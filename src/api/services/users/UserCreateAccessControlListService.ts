import { Permission, Role } from '@prisma/client';
import { PermissionRepository } from '../../repositories/permissions/PermissionRepository';
import { RoleRepository } from '../../repositories/roles/RoleRepository';
import { UserRepository } from '../../repositories/users/UserRepository';
import { AppError } from '../../utils/AppError'

interface UserACLRequest {
  userId: string
  roles: Role[]
  permissions: Permission[]
}

export class CreateUserAccessControlListService {
  repository: UserRepository

  constructor(repository:UserRepository) {
    this.repository = repository
  }

  async execute({ userId, roles, permissions }: UserACLRequest) {
    const userRepository = new UserRepository()
    const permissionRepository = new PermissionRepository()
    const roleRepository = new RoleRepository()
    
    const user = await userRepository.findById(userId)
        
    if(!user) {
      throw new AppError("Usuário não existe!")
    }

    const permissionsExists = await permissionRepository.showByIds(permissions)
    const rolesExists = await roleRepository.showByIds(roles)

    
    if(!permissionsExists){
      throw new AppError("Permissões não existente!")
    }

    if(!rolesExists) {
      throw new AppError("Roles não existente!")
    }


    await userRepository.update({
      user,
      permissions,
      roles
    })
    
    return user

  }
}