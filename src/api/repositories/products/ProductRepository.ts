import { prisma } from '../../database/prisma'

export interface IProduct{
  id?:number
  name:string
  description:string
  price:number
  image_id:string
}
export class ProductRepository {

  async index() {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: {
          select: {
            id: true,
            image_name: true,
            image_type: true
          }
        },
        ingredients: {
          select: {
            ingredient: {
              select: {
                id: true,
                name: true,
                image: {
                  select: {
                    id: true,
                    image_name: true,
                    image_type: true
                  }
                }
              }
            }
          }
        },
        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
                description: true
              }
            }
          }
        },
      },
      orderBy: {
        id: 'asc'
      }
    })
    return products
  }

  async findById(id:number) {
    const product = await prisma.product.findFirst({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: {
          select: {
            id: true,
            image_name: true,
            image_type: true
          }
        },
        ingredients: {
          select: {
            ingredient: {
              select: {
                id: true,
                name: true,
                image: {
                  select: {
                    id: true,
                    image_name: true,
                    image_type: true
                  }
                }
              }
            }
          }
        },
        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
                description: true
              }
            }
          }
        },
      },
      where: {
        id
      }
    })

    return product
  }

  async findByName(name:string) {
    const product = await prisma.product.findFirst({
      where: {
        name
      }
    })

    return product
  }

  async create({ name, description, price, image_id }:IProduct) {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image_id
      }
    })

    return { id: newProduct.id }
  }

  async update({ id, name, description, price, image_id }:IProduct) {
    const product = await prisma.product.update({
      where: {
        id
      },
      data: {
        name,
        description,
        price,
        image_id
      }
    })

    return product
  }

  async delete(id:number) {
    const deletedProduct = await prisma.product.delete({
      where: {
        id
      }
    })

    return { id: deletedProduct.id }
  }

  async addCategory(product_id:number, category_id:number) {
    const relation = await prisma.productCategory.create({
      data: {
        fk_id_category: category_id,
        fk_id_product: product_id
      }
    })

    return relation
  }
}

