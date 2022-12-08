import { Request, Response } from "express";
import {
  IImage,
  ImageRepository,
} from "../repositories/images/ImageRepository";
import { ImageCreateService } from "../services/images/ImageCreateService";
import { ImageDeleteService } from "../services/images/ImageDeleteService";
import { ImageIndexService } from "../services/images/ImageIndexService";
import { ImageShowService } from "../services/images/ImageShowService";
import { ImageUpdateService } from "../services/images/ImageUpdateService";
import { AppError } from "../utils/AppError";

export class ImagesController {
  async create(request: Request, response: Response) {
    const { filename, url } = request.body;

    const imageRepository = new ImageRepository();
    const imageCreateService = new ImageCreateService(
      imageRepository
    );

    const imageResult = await imageCreateService.execute({
      filename,
      url,
    });

    if (imageResult instanceof AppError) {
      return response.status(400).json(imageResult.message);
    }

    return response.status(201).json(imageResult);
  }

  async delete(request: Request, response: Response) {
    const { image_id } = request.body;
    const imageRepository = new ImageRepository();
    const imageDeleteService = new ImageDeleteService(
      imageRepository
    );
    const imageResult = await imageDeleteService.execute(
      image_id
    );
    if (imageResult instanceof AppError) {
      return response.status(400).json(imageResult.message);
    }
    return response.status(200).json(imageResult);
  }

  async show(request: Request, response: Response) {
    const { image_id } = request.body;
    const imageRepository = new ImageRepository();
    const imageShowService = new ImageShowService(
      imageRepository
    );

    const imageResult = await imageShowService.execute(image_id);

    if (imageResult instanceof AppError) {
      return response.status(400).json(imageResult.message);
    }
    return response.status(200).json(imageResult);
  }

  async index(request: Request, response: Response) {
    const imageRepository = new ImageRepository();
    const imageIndexService = new ImageIndexService(
      imageRepository
    );

    const imagesResult = await imageIndexService.execute();

    return response.status(200).json(imagesResult);
  }

  async update(request: Request, response: Response) {
    const { id, filename, url }: IImage = request.body;

    const imageRepository = new ImageRepository();
    const imageUpdateService = new ImageUpdateService(
      imageRepository
    );

    const updatedImage = await imageUpdateService.execute({
      id,
      filename,
      url,
    });

    if (updatedImage instanceof AppError) {
      return response.status(400).json(updatedImage.message);
    }
    return response.status(200).json(updatedImage);
  }
}
