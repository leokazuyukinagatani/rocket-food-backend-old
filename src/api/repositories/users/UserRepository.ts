import { Permission, Role, User } from "@prisma/client";
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

  async showByIdWithPermissions(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        permissions: {
          where:{
            userId: id
          }
        }
      }
    });
    return user;
  }
  async showByIdWithRoles(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        roles: {
          where:{
            userId: id
          }
        }
      }
    });
    return user;
  }

  async updateACL(id: string, permissionExists:Permission[], roleExists:Role[]) {
   
    function permissionIds(item:Permission){
      const permissionId = item.id
      const itemResponse = {
        permissionId
      }
      return itemResponse
    }
    function roleIds(item:Role){
      const roleId = item.id
      const itemResponse = {
        roleId
      }
      return itemResponse
    }
    
    
    const permissionsIds = permissionExists.map(permissionIds)
    const rolesIds = roleExists.map(roleIds)

    // console.log("AUX =======>",permissionsIds,"<======AUX")

    const user = await prisma.user.update({
      where:{
        id
      },
      data: {
        permissions: {
          createMany: {
            data: permissionsIds
          }
        },
        roles: {
          createMany: {
            data: rolesIds
          }
        }
      }
    })
    
    // await prisma.usersOnPermissions.createMany({
    //   data:{
    //     userId: id,
    //     permissionId
    //   }
    // })

    // const permissionRepository = new PermissionRepository()
    // const userRepository = new UserRepository()
    // const permissionACLRepository = new PermissionACLRepository()

    // const permissionAccessControlListService = new PermissionAccessControlListService(permissionRepository, userRepository, permissionACLRepository)
    
    // async function auxFunction(item){
    //   permissionAccessControlListService.execute(item)
    // }

    
 
  
    return user
  }

}
