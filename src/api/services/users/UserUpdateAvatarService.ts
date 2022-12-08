import { IImage } from "../../repositories/images/ImageRepository";
import { UserRepository } from "../../repositories/users/UserRepository";
import { AppError } from "../../utils/AppError";
import { UserShowService } from "./UserShowService";

interface UserRequest {
  id: string;
  image: IImage;
}

export class UserUpdateAvatarService {
  repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }
  async execute({ id, image }: UserRequest) {
    const user = await new UserShowService(this.repository).execute(id);
    if (!user) {
      throw new AppError("User not found");
    }

    const updatedUser = await this.repository.updateWithImage(user, image);

    return updatedUser;
  }
}
