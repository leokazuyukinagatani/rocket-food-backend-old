import { Request, Response } from "express";
import { RoleRepository } from "../repositories/roles/RoleRepository";
import { RoleCreateService } from "../services/roles/RoleCreateService";
import { AppError } from "../utils/AppError";

export class RolesController {
  async create(request: Request, response: Response) {
    const { name, description } = request.body;

    const roleRepository = new RoleRepository();
    const roleCreateService = new RoleCreateService(roleRepository);

    const result = await roleCreateService.execute({ name, description });

    if (result instanceof AppError) {
      return response.status(400).json(result.message);
    }

    return response.status(201).json(result);
  }
}
