import prismaClient from "../utils/database";
import { ToursResponse } from "./TourService";

type searchQuery = {
  destination: string;
  types: Array<number>
  date: string,
  guests: string
}

export class SearchService {
  static async searchTours({ destination, types, date, guests }: searchQuery): Promise<ToursResponse> {
    try {
      const whereClause: any = {};
  
      if (destination && typeof destination === 'string') {
        whereClause.OR = [
          { city: { contains: destination } },
          { country: { contains: destination } },
        ];
      }
  
      if (types && types.length > 0 && !types.some(isNaN)) {
        whereClause.categories = {
          some: {
            categoryId: { in: types }
          }
        };
      }
  
      if (date && typeof date === 'string') {
        whereClause.initialDate = {
          gt: new Date(date)
        };
      }
  
      if (guests && !isNaN(Number(guests))) {
        whereClause.maxPeople = {
          gte: parseInt(guests),
        };
      }
  
      const tours = await prismaClient.tour.findMany({
        where: whereClause,
        include: {
          categories: {
            include: { category: true }
          }
        }
      })
  
      return { tours, error: null };
    } catch (error) {
      console.error('Error retrieving search results: ', error);
      return { tours: null, error: 'Internal server error'}
    }
  }
} 