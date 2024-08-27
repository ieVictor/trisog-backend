import { Category } from "../models/categoryModel"
import prismaClient from "../utils/database"

export class CategoryService {
  static async getCategories(): Promise<{ categories: Category[] | null, error: string | null }> {
    try {
      const categories = await prismaClient.category.findMany();
      return { categories, error: 'null' }
    } catch (error) {
      console.error('Error retrieving categories: ', error);
      return { categories: null, error: 'Internal server error' };
    }
  }
}