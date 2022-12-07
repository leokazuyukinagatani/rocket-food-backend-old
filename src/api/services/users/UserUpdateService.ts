import { compare, hash } from "bcryptjs";
import { UserRepository } from "../../repositories/users/UserRepository";
import { AppError } from "../../utils/AppError";
import { UserShowByEmailService } from "./UserShowByEmailService";
import { UserShowService } from "./UserShowService";

interface Image {
  filename: string;
  url: string;
}

interface UserRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  image: Image;
}

export class UserUpdateService {
  repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }
  async execute({
    id,
    name,
    email,
    password,
    passwordConfirm,
    image
  }: UserRequest) {
    
    const user = await new UserShowService(this.repository).execute(id);
    if (!user) {
      throw new AppError("User not found");
    }

    const userWithUpdatedEmail = await new UserShowByEmailService(
      this.repository
    ).execute(user.email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("There is already a user with that email");
    }

    /* Em caso de não ter vindo os parametros de nome e email utiliza os que veio do banco */
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (!password && passwordConfirm) {
      throw new AppError(
        "You must provide a passwordConfirm in order to change your password"
      );
    }

    if (password && passwordConfirm) {
      const checkedPassword = await compare(passwordConfirm, user.password);
      if (checkedPassword) {
        const hashedPassword = await hash(password, 8);
        const updatedUser = await this.repository.update({
          id: user.id,
          name: user.name,
          email: user.email,
          password: hashedPassword,
        });

        return updatedUser;
      }
    }else {
      throw new AppError('Invalid password');
    }
    if(image){
      const updatedUserWithImage = await this.repository.update({
        id: user.id,
        name: user.name,
        email: user.email,
        image
      });
      return updatedUserWithImage;
    }
    const updatedUser = await this.repository.update({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return updatedUser;

  }
}
