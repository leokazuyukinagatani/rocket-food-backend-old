import { compare } from "bcryptjs";
import { AppError } from "../utils/AppError";
import { authConfig } from "../configs/auth";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";
import { UserRepository } from "../repositories/users/UserRepository";
import { UserShowByEmailService } from "../services/users/UserShowByEmailService";

export class SessionsController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;
    const userRepository = new UserRepository();
    const userShowByEmailService = new UserShowByEmailService(userRepository);

    const user = await userShowByEmailService.execute(email);

    if (!user) {
      throw new AppError("email ou senha incorretos");
    }

    const isPassword = await compare(password, user.password);

    if (!isPassword) {
      throw new AppError("email ou senha incorretos");
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response.json({ user, token });
  }
}
