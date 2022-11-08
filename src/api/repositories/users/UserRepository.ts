import { User } from "@prisma/client";
import { prisma } from "../../database/prisma";
export interface IUser {
  name: string;
  email: string;
  password: string;
}

export class UserRepository {
  async create({ name, email, password }: IUser) {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    return newUser.id;
  }
  
  async update({ id, name, email, password }: User) {

   const userId = await prisma.user.update({
    where: {
      id
    },
    data: {
      name,
      email,
      password,
      updatedAt: (new Date())
    }
   })

    return userId
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    });
    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    return user;
  }
}
