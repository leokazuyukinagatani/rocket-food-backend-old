import { Request, Response } from "express";
import { DiskStorage } from "../../providers/DiskStorage";
import { UserRepository } from "../repositories/users/UserRepository";
import { UserShowService } from "../services/users/UserShowService";
import { UserUpdateService } from "../services/users/UserUpdateService";
import { prisma } from "../database/prisma";
import { AppError } from "../utils/AppError";

export class UserAvatarController {
  async update(request: Request, response: Response) {
    const user_id = request.body.user.id;
    const avatarFilename = request.file?.filename;

    const userRepository = new UserRepository();
    const userShowService = new UserShowService(userRepository);
    const userUpdateService = new UserUpdateService(userRepository);

    const diskStorage = new DiskStorage();

    const user = await userShowService.execute(user_id);

    if (!user) {
      throw new AppError("Only authenticated users can change avatar", 401);
    }
    if (!avatarFilename) {
      throw new AppError("Filename is required", 404);
    }

    const imageResult = await prisma.image.findFirst({
      where: { filename: avatarFilename },
    });

    if (imageResult) {
      await diskStorage.deleteFile(imageResult.filename);
    }

    const image = await diskStorage.saveFile(avatarFilename, "users");

    const userResult = await userUpdateService.execute({ id: user.id, image });

    if (userResult instanceof AppError) {
      return response.status(400).json(userResult.message);
    }

    return response.status(201).json(userResult);
  }
}
