import { Tour, TourInsert } from "../models/tourModel";
import prismaClient from "../utils/database";

export class TourService {
  static async getTours(): Promise<{ tours: Tour[] | null, error: string | null }> {
    try {
      const tours = await prismaClient.tour.findMany();
      return { tours, error: null}
    } catch (error) {
      console.error('Error retrieving tours: ', error);
      return { tours: null, error: 'Internal Server Error'};
    }
  }

  static async getTourById(tour_id: string): Promise<{ tour: Tour | null, error: string | null}> {
    try {
      const tour = await prismaClient.tour.findUnique({
        where: {
          id: tour_id
        },
      });

      if (tour) return { tour, error: null};
      return { tour: null, error: null};
    } catch (error) {
      console.error('Error when searching for tour by ID: ', error);
      return { tour: null, error: 'Internal server error' };
    }
  };

  static async createTour(data: TourInsert): Promise<{ createdTourId: string | null; error: string | null }> {
    const initialRating = 0
    try {
      const result = await prismaClient.tour.create({
        data: {
          ...data,
          rating: initialRating
        },
      })
      return { createdTourId: result.id, error: null}
    } catch (error) {
      console.error('Error creating tour: ', error);
      return { createdTourId: null, error: 'Internal Server Error'};
    }
  }
}
