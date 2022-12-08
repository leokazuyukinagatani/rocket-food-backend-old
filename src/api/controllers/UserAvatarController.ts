import { Request, Response } from "express";
import { DiskStorage } from "../../providers/DiskStorage";
import { UserRepository } from "../repositories/users/UserRepository";
import { UserShowService } from "../services/users/UserShowService";
import { AppError } from "../utils/AppError";
import { ImageRepository } from "../repositories/images/ImageRepository";
import { ImageCreateService } from "../services/images/ImageCreateService";
import { UserUpdateAvatarService } from "../services/users/UserUpdateAvatarService";
import { CustomRequest } from "../middlewares/ensureAuthenticated";
import { ImageShowByNameService } from "../services/images/ImageShowByNameService";
import { ImageUpdateService } from "../services/images/ImageUpdateService";
import { ImageUpsertService } from "../services/images/ImageUpsertService";

export class UserAvatarController {
  async update(request: CustomRequest, response: Response) {
    const user_id = request.user?.id;

    const userRepository = new UserRepository();
    const userShowService = new UserShowService(userRepository);
    const userUpdateAvatarService = new UserUpdateAvatarService(userRepository);
    const imageRepository = new ImageRepository();
    const imageCreateService = new ImageCreateService(imageRepository);
    const imageUpdateService = new ImageUpdateService(imageRepository);
    const imageShowByNameService = new ImageShowByNameService(imageRepository);

    const imageUpsertService = new ImageUpsertService(imageRepository);
    const diskStorage = new DiskStorage();
    if (typeof user_id !== "string") {
      throw new AppError("not user_id found");
    }
    const user = await userShowService.execute(user_id);
    console.log("User ====>", user);
    if (!user) {
      throw new AppError("Only authenticated users can change avatar", 401);
    }

    const imageResult = await imageShowByNameService.execute(
      `avatar-${user_id}`
    );
    console.log("imageResult =", imageResult);
    if (imageResult) {
      await diskStorage.deleteFile(imageResult.filename);
    }

    const image = await diskStorage.saveFile(`avatar-${user_id}`, "users");
    if (!image) {
      throw new AppError("Could not save");
    }
    console.log("image ===>", image);
    
    // if(imageResult) {
    //   await imageUpdateService.execute({
    //     id: imageResult.id,
    //     filename: image.filename,
    //     url: image.url})
    // }else {
    //   await imageCreateService.execute(image)
    // }

    const imageAvatar = await imageUpsertService.execute(image);
    

    const userResult = await userUpdateAvatarService.execute({
      id: user_id,
      image: imageAvatar,
    });

    if (userResult instanceof AppError) {
      return response.status(400).json(userResult.message);
    }

    return response.status(201).json(userResult);
  }
}
