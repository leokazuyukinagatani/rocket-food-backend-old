import { UserRepository } from '../../repositories/users/UserRepository';

class UserShowService {
  repository: UserRepository

  constructor(repository:UserRepository) {
    this.repository = repository
  }
  

  async execute(email:string) {
 
    const userWithEmail = await this.repository.showByEmail(email)

    return userWithEmail
  }
}

export {
  UserShowService
}