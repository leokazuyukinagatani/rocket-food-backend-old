import { Category } from "@prisma/client"
import { CategoryRepository } from "../../repositories/categories/CategoryRepository"
import { AppError } from "../../utils/AppError"

interface CategoryRequest {
  name: string
  description: string
}

export class CategoryCreateService {
  repository:CategoryRepository
 
  constructor(repository:CategoryRepository) {
    this.repository = repository
  }
  async execute({ name, description }: CategoryRequest): Promise<Category> {

    
    const categoryExist = await this.repository.showByName(name)
    if(categoryExist){
      throw new AppError("Category already exists",403)
    }
    

    try {
      const category = await this.repository.create(name, description)
      return category
    } catch (error) {
      throw new AppError('Não foi possivel criar uma nova Category');
    }
    
  }
}