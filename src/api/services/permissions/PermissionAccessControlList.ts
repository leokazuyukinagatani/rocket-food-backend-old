import { PermissionRepository } from '../../repositories/permissions/PermissionRepository';
import { UserRepository } from '../../repositories/users/UserRepository';
import { PermissionACLRepository } from '../../repositories/permissions/PermissionACLRepository';
import { AppError } from '../../utils/AppError'

export interface IUserACLPermissionRequest {
  userId: string
  permission: string
}

export class PermissionAccessControlListService {
  permissionRepository: PermissionRepository
  userRepository: UserRepository
  permissionACLRepository: PermissionACLRepository


  constructor(permissionRepository:PermissionRepository, userRepository:UserRepository, permissionACLRepository: PermissionACLRepository) {
    this.permissionRepository = permissionRepository
    this.userRepository = userRepository
    this.permissionACLRepository = permissionACLRepository

  }

  async execute({ userId, permission }: IUserACLPermissionRequest) {
  
    
    const user = await this.userRepository.showById(userId)
        
    if(!user) {
      throw new AppError("Usuário não existe!")
    }

    const permissionExists = await this.permissionRepository.showByName(permission)
    if(!permissionExists){
      throw new AppError("Permissões não existente!")
    }
    
    await this.permissionACLRepository.create(
      user.id,
      permissionExists.id
    )
    
    return user

  }
}