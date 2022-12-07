import { Request, Response } from "express";
import { PermissionRepository } from "../repositories/permissions/PermissionRepository";
import { RoleRepository } from "../repositories/roles/RoleRepository";
import { UserRepository } from "../repositories/users/UserRepository";
import { ACLCreateUserAccessControlListService } from "../services/acls/ACLCreateUserAccessControlListService";
import { UserCreateService } from "../services/users/UserCreateService";
import { UserShowService } from "../services/users/UserShowService";

export class UsersController {
  async create(request: Request, response: Response) {
    const { name, email, password, passwordConfirm } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    const id = await userCreateService.execute({
      name,
      email,
      password,
      passwordConfirm,
    });

    return response.status(201).json({ id });
  }
  async show(request: Request, response: Response) {
    const { email } = request.body;

    const userRepository = new UserRepository();
    const userShowService = new UserShowService(userRepository);

    const user = await userShowService.execute(email);

    return response.status(200).json({ user });
  }
  async access(request: Request, response: Response) {
    const { roles, permissions, userEmail } = request.body;

    const userRepository = new UserRepository();
    const roleRepository = new RoleRepository();
    const permissionRepository = new PermissionRepository();

    const userACL = new ACLCreateUserAccessControlListService(
      userRepository,
      permissionRepository,
      roleRepository
    );
    userACL.execute({ userEmail, roles, permissions });

    return response.status(200).json({});
  }
}
