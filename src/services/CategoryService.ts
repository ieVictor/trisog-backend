import { Category } from '../models/categoryModel';
import prismaClient from '../utils/database';

export class CategoryService {
  static async getCategories(): Promise<{
    categories: Category[] | null;
    error: string | null;
  }> {
    try {
      const categories = await prismaClient.category.findMany({
        orderBy: { name: 'asc' },
        include: {
          _count: {
            select: { tours: true },
          },
        },
      });

      const categoriesWithPrices = await Promise.all(
        categories.map(async (category) => {
          const lowestPriceTour = await prismaClient.tour.findFirst({
            where: {
              categories: {
                some: { categoryId: category.id },
              },
            },
            orderBy: { price: 'asc' },
            select: { price: true },
          });

          return {
            id: category.id,
            name: category.name,
            tourCount: category._count.tours,
            lowestPrice: lowestPriceTour ? lowestPriceTour.price : null,
          };
        })
      );

      return { categories: categoriesWithPrices, error: null };
    } catch (error) {
      console.error('Error retrieving categories: ', error);
      return { categories: null, error: 'Internal server error' };
    }
  }
}
