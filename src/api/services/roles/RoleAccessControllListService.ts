import { RoleRepository } from '../../repositories/roles/RoleRepository';
import { UserRepository } from '../../repositories/users/UserRepository';
import { RoleACLRepository } from '../../repositories/roles/RoleACLRepository';
import { AppError } from '../../utils/AppError'

interface UserACLRoleRequest {
  userId: string
  role: string
}

export class RoleAccessControlListService {
  roleRepository: RoleRepository
  userRepository: UserRepository
  roleACLRepository: RoleACLRepository


  constructor(roleRepository:RoleRepository, userRepository:UserRepository, roleACLRepository: RoleACLRepository) {
    this.roleRepository = roleRepository
    this.userRepository = userRepository
    this.roleACLRepository = roleACLRepository

  }

  async execute({ userId, role }: UserACLRoleRequest) {
  
    
    const user = await this.userRepository.showById(userId)
        
    if(!user) {
      throw new AppError("Usuário não existe!")
    }

    const roleExists = await this.roleRepository.showByName(role)
    if(!roleExists){
      throw new AppError("Permissões não existente!")
    }
    

    await this.roleACLRepository.create(
      user.id,
      roleExists.id
    )
    
    return user

  }
}