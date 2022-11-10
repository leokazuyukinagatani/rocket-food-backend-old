import { Permission, Role, User, UsersOnPermissions } from "@prisma/client";
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

  async showByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    });
    return user;
  }

  async showById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    return user;
  }

  async updateACL(id: string, permissionExists:Permission[], roleExists:Role[]) {


    const aux:UsersOnPermissions[] = permissionExists.map(permissionsOnUser)

    function permissionsOnUser(item:Permission){
      const permissionId = item.id
      const itemResponse:UsersOnPermissions = {
        userId: id,
        permissionId
      }
      return itemResponse
    }

    console.log(aux)


  
    return
  }

}
