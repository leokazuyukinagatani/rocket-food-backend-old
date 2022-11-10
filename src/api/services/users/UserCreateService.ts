import { UserRepository } from '../../repositories/users/UserRepository';
import { AppError } from '../../utils/AppError'
import * as EmailValidator from 'email-validator';
import { hashSync } from 'bcryptjs'

interface UserRequest {
  name: string
  email: string
  password: string
  passwordConfirm: string
}
class UserCreateService {
  repository: UserRepository

  constructor(repository:UserRepository) {
    this.repository = repository
  }

  async execute({ name, email, password, passwordConfirm }:UserRequest) {
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
     if(!EmailValidator.validate(email)) {
       throw new AppError('Email inválido.')
     }
     if(!passwordRegex.test(password)) {
       throw new AppError('Senha inválida, a senha deve conter ao menos um digito, uma letra minúscula, uma letra maiúscula, um caractere especial e ao menos 8 caracteres')
     }
     if(!passwordConfirm) {
       throw new AppError('Confimação de senha obrigatória')
    }
    if(password != passwordConfirm) {
      throw new AppError('Senhas não conferem')
    }
    const userWithEmail = await this.repository.showByEmail(email)

    if(userWithEmail) {
      throw new AppError('Email já cadastrado',403)
    }

    const hashedPassword = hashSync(password)

    const userId = await this.repository.create({ name, email, password: hashedPassword })

    if(userId){
      console.log(userId)
    }

    if(!userId) {
      throw new AppError('erro ao cadastrar usuario')
    }

    return { userId }
  }
}

export {
  UserCreateService
}