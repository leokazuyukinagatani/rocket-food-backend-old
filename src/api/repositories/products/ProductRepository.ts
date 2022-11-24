import { prisma } from '../../database/prisma'

export interface IProduct{
  id?:string
  name:string
  description:string
  price:number
  imageId:string
}
export class ProductRepository {

  async index() {
    const products = await prisma.product.findMany()
    
    return products
  }

  async findById(id:string) {
    const product = await prisma.product.findFirst({
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


  async create({ name, description, price, imageId }:IProduct) {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageId
      }
    })

    return { id: newProduct.id }
  }

  async update({ id, name, description, price }:IProduct) {
    
    const product = await prisma.product.update({
      where: {
        id
      },
      data: {
        name,
        description,
        price
      }
    })

    return product
  }


  async delete(id:string) {
    const deletedProduct = await prisma.product.delete({
      where: {
        id
      }
    })

    return { id: deletedProduct.id }
  }

}

