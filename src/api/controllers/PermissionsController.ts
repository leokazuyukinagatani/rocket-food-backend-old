import { Request, Response } from "express";
import { PermissionRepository } from "../repositories/permissions/PermissionRepository";
import { PermissionCreateService } from "../services/permissions/PermissionCreateService";

export class PermissionsController {
  async create(request: Request, response:Response) {
    const { name, description } = request.body

    const permissionRepository = new PermissionRepository()
    const permissionCreateService = new PermissionCreateService(permissionRepository) 

    const result = await permissionCreateService.execute({name, description})

    if(result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.status(201).json(result)
  }
}