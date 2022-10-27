import { UserRepository } from '../../repositories/users/UserRepository';
import { AppError } from '../../utils/AppError'
import * as EmailValidator from 'email-validator';
import { hashSync } from 'bcryptjs'
import { User } from '@prisma/client';

class UserCreateService {
  repository: UserRepository

  constructor(repository:UserRepository) {
    this.repository = repository
  }

  async execute({ name, email, password}:User, passwordConfirm:string) {
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#?])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/;
    
    if(!name) {
      throw new AppError('Nome é obrigatório.')
    }
    if(!email) {
      throw new AppError('Email é obrigatório.')
    }
    if(!password) {
      throw new AppError('Senha é obrigatória.')
    }
    if(!passwordConfirm){
      throw new AppError('Confimação da senha é obrigatória.')
    }

    if(!EmailValidator.validate(email)) {
      throw new AppError('Email inválido.')
    }

    if(!passwordRegex.test(password)){
      throw new AppError('Senha inválida, a senha deve conter ao menos um digito, uma letra minúscula, uma letra maiúscula, um caractere especial e ao menos 8 caracteres')
    }

    if(password != passwordConfirm) {
      throw new AppError('Senhas não conferem.')
    }

    const userWithEmail = await this.repository.findByEmail(email)

    if(userWithEmail) {
      throw new AppError('Email já cadastrado')
    }

    const hashedPassword = hashSync(password)

    const userCreated = await this.repository.create({ name, email, password: hashedPassword })

    return { id: userCreated.id }
  }
}

export {
  UserCreateService
}