import { UserRepository } from "../../repositories/users/UserRepository";

export class UserShowByEmailService {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(email: string) {
    const userWithEmail = await this.repository.showByEmail(email);

    return userWithEmail;
  }
}

