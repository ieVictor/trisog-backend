import { Tour, TourInsert } from "../models/tourModel";
import prismaClient from "../utils/database";

export type ToursResponse = { tours: Tour[] | null, error: string | null }
type TourResponse = { tour: Tour | null, error: string | null };

export class TourService {
  static async getTours(): Promise<ToursResponse> {
    try {
      const tours = await prismaClient.tour.findMany({
        include: {
          categories: {
            include: {
              category: true
            }
          }
        }
      });
      return { tours, error: null}
    } catch (error) {
      console.error('Error retrieving tours: ', error);
      return { tours: null, error: 'Internal Server Error'};
    }
  }

  static async getToursByCategories(categories: number[]): Promise<ToursResponse> {
    try {
      const tours = await prismaClient.tour.findMany({
        where: {
          categories: {
            some: {
              categoryId: { in: categories }
            }
          }
        },
        include: {
          categories: {
            include: { category: true }
          }
        }
      })
      return { tours, error: null}
    } catch (error) {
      console.error('Error retrieving tours: ', error);
      return { tours: null, error: 'Interal server error'}
    }
  }

  static async getTourById(tour_id: string): Promise<TourResponse> {
    try {
      const tour = await prismaClient.tour.findUnique({
        where: {
          id: tour_id
        },
        include: {
          categories: {
            include: {
              category: true
            }
          } 
        }
      });

      if (tour) return { tour, error: null};
      return { tour: null, error: null};
    } catch (error) {
      console.error('Error when searching for tour by ID: ', error);
      return { tour: null, error: 'Internal server error' };
    }
  };

  static async createTour(data: TourInsert): Promise<{ createdTourId: string | null; error: string | null }> {
    const {categoriesIds, ...tourdata} = data
    const initialRating = 0
    try {
      const result = await prismaClient.tour.create({
        data: {
          ...tourdata,
          rating: initialRating,
          categories: {
            create: data.categoriesIds.map(categoryId => ({
              category: {
                connect: { id: categoryId }
              }
            }))
          }
        },
      })
      return { createdTourId: result.id, error: null}
    } catch (error) {
      console.error('Error creating tour: ', error);
      return { createdTourId: null, error: 'Internal Server Error'};
    }
  }
}
