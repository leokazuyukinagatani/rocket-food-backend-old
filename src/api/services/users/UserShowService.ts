import { UserRepository } from "../../repositories/users/UserRepository";

export class UserShowService {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(id: string) {
    const userResult = await this.repository.showById(id);

    return userResult;
  }
}

