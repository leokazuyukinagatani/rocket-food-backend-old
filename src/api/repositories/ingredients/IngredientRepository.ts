import { prisma } from '../../database/prisma'

export interface IIngredient{
  id?:string
  name:string
  description:string
  imageId:string
}
export class IngredientRepository {

  async index() {
    const ingredients = await prisma.ingredient.findMany()
    
    return ingredients
  }

  async findById(id:string) {
    const ingredient = await prisma.ingredient.findFirst({
      where: {
        id
      }
    })
    return ingredient
  }

  async findByName(name:string) {
    const ingredient = await prisma.ingredient.findFirst({
      where: {
        name
      }
    })

    return ingredient
  }


  async create({ name, description, imageId }:IIngredient) {
    const newIngredient = await prisma.ingredient.create({
      data: {
        name,
        description,
        imageId
      }
    })

    return { id: newIngredient.id }
  }

  async update({ id, name, description }:IIngredient) {
    
    const ingredient = await prisma.ingredient.update({
      where: {
        id
      },
      data: {
        name,
        description
      }
    })

    return ingredient
  }


  async delete(id:string) {
    const deletedIngredient = await prisma.ingredient.delete({
      where: {
        id
      }
    })

    return { id: deletedIngredient.id }
  }

}

