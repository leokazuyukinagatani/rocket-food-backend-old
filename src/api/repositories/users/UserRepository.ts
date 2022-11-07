import { Permission, Role, User } from "@prisma/client";
import { prisma } from "../../database/prisma";
export interface IUser {
  name: string;
  email: string;
  password: string;
}
interface IUserWithPermissionsAndRoles {
  user: User
  permissions: Permission[]
  roles: Role[]
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
  
  async update({user, permissions, roles}:IUserWithPermissionsAndRoles) {

    if(permissions){
     try {
      for(let permission of permissions ){
        await prisma.usersOnPermissions.create({
          data: {
            permissionId: permission.id,
            userId: user.id
          }
        })
      }
     } catch (error) {
        console.log(error)
     }
    }
    if(roles){
      try {
        for(let role of roles) {
          await prisma.usersOnRoles.create({
            data: {
              roleId: role.id,
              userId: user.id
            }
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    return user.id
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
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
