import { Request, Response } from "express";
import { DiskStorage } from "../../providers/DiskStorage";
import { UserRepository } from "../repositories/users/UserRepository";
import { UserShowService } from "../services/users/UserShowService";
import { AppError } from "../utils/AppError";
import { ImageRepository } from "../repositories/images/ImageRepository";
import { ImageCreateService } from "../services/images/ImageCreateService";
import { ImageShowService } from "../services/images/ImageShowService";
import { UserUpdateAvatarService } from "../services/users/UserUpdateAvatarService";

export class UserAvatarController {
  async update(request: Request, response: Response) {
    const user_id = request.body.user.id;
    if (!request.file) {
      throw new AppError("File is required", 404);
    }
    const avatarFilename = request.file.filename;

    const userRepository = new UserRepository();
    const userShowService = new UserShowService(userRepository);
    const userUpdateAvatarService = new UserUpdateAvatarService(userRepository);
    const imageRepository = new ImageRepository();
    const imageCreateService = new ImageCreateService(imageRepository);
    const imageShowService = new ImageShowService(imageRepository);

    const diskStorage = new DiskStorage();

    const user = await userShowService.execute(user_id);

    if (!user) {
      throw new AppError("Only authenticated users can change avatar", 401);
    }

    const imageResult = await imageShowService.execute(avatarFilename);

    if (imageResult) {
      await diskStorage.deleteFile(imageResult.filename);
    }

    const image = await diskStorage.saveFile('arquivo-teste', "users");
    await imageCreateService.execute(image);

    if (!image) {
      throw new AppError("Could not save");
    }

    const userResult = await userUpdateAvatarService.execute({ id: user.id, image });

    if (userResult instanceof AppError) {
      return response.status(400).json(userResult.message);
    }

    return response.status(201).json(userResult);
  }
}
