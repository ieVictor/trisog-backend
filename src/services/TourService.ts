import { Prisma } from '@prisma/client';
import { Tour, TourInsert } from '../models/tourModel';
import prismaClient from '../utils/database';

export type ToursResponse = { tours: Tour[] | null; error: string | null };
type TourResponse = { tour: Tour | null; error: string | null };
type PaginationTourResponse = {
  page: number;
  limit: number;
  total_pages: number;
  total_tours: number;
  tours: Tour[];
};

export class TourService {
  static async getTours(
    sortBy: string = 'title',
    sortDirection: string = 'asc',
    page: number,
    limit: number,
    categories: Array<number> = [1, 2, 3, 4, 5, 6, 7],
    price: number = Number.MAX_VALUE,
    rating: number = 1,
    countries: string[] = [],
    search?: string,
    date?: string,
    guests?: number
  ): Promise<{ tours: PaginationTourResponse | null; error: string | null }> {
    try {
      const pageNumber = isNaN(page) || page < 1 ? 1 : page;
      const limitNumber = isNaN(limit) || limit < 1 ? 8 : limit;
      const whereClause: Prisma.TourWhereInput = {};

      if (search && search.length > 0) {
        const searchLower = search.toLowerCase();
        whereClause.OR = [
          { title: { contains: searchLower } },
          { overview: { contains: searchLower } },
          { city: { contains: searchLower } },
          { country: { name: { contains: search } } },
        ];
      }
      if (rating > 0) {
        whereClause.rating = { gte: rating };
      }
      if (categories.length > 0) {
        whereClause.categories = { some: { categoryId: { in: categories } } };
      }
      if (date) {
        const isoString = new Date(date).toISOString();
        whereClause.initialDate = { gte: isoString };
      }
      if (price) {
        whereClause.price = { lte: price };
      }
      if (countries.length > 0) whereClause.countryId = { in: countries };
      if (guests) whereClause.maxPeople = { gte: guests };

      const totalTours = await prismaClient.tour.count({ where: whereClause });
      const totalPages = Math.ceil(totalTours / limitNumber);
      const orderBy = sortBy ? { [sortBy]: sortDirection } : undefined;

      const tours = await prismaClient.tour.findMany({
        where: whereClause,
        orderBy,
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
        include: {
          country: { select: { name: true } },
          categories: {
            include: { category: true },
          },
          _count: {
            select: { reviews: true },
          },
        },
      });

      const response: PaginationTourResponse = {
        page: pageNumber,
        limit: limitNumber,
        total_pages: totalPages,
        total_tours: totalTours,
        tours,
      };

      return { tours: response, error: null };
    } catch (error) {
      console.error('Error retrieving tours: ', error);
      return { tours: null, error: 'Internal Server Error' };
    }
  }

  static async getToursByCategories(
    categories: number[]
  ): Promise<ToursResponse> {
    try {
      const tours = await prismaClient.tour.findMany({
        where: {
          categories: {
            some: {
              categoryId: { in: categories },
            },
          },
        },
        include: {
          country: { select: { name: true } },
          categories: {
            include: { category: true },
          },
          _count: { select: { reviews: true } }
        },
      });
      return { tours, error: null };
    } catch (error) {
      console.error('Error retrieving tours: ', error);
      return { tours: null, error: 'Interal server error' };
    }
  }

  static async getTourById(tour_id: string): Promise<TourResponse> {
    try {
      const tour = await prismaClient.tour.findUnique({
        where: {
          id: tour_id,
        },
        include: {
          country: { select: { name: true }},
          categories: {
            include: { category: true },
          },
          _count: {
            select: { reviews: true },
          },
        },
      });

      if (!tour) return { tour: null, error: null };

      const ratingAverages = await prismaClient.review.aggregate({
        where: { tourId: tour_id },
        _avg: {
          services: true,
          locations: true,
          amenities: true,
          prices: true,
          food: true,
          room: true,
        },
      });

      const formattedTour = {
        ...tour,
        ratings: {
          services: ratingAverages._avg.services || 0,
          locations: ratingAverages._avg.locations || 0,
          amenities: ratingAverages._avg.amenities || 0,
          prices: ratingAverages._avg.prices || 0,
          food: ratingAverages._avg.food || 0,
          room: ratingAverages._avg.room || 0,
        },
      };
      return { tour: formattedTour, error: null };
    } catch (error) {
      console.error('Error when searching for tour by ID: ', error);
      return { tour: null, error: 'Internal server error' };
    }
  }

  static async createTour(
    data: TourInsert
  ): Promise<{ createdTourId: string | null; error: string | null }> {
    const { categoriesIds, ...tourdata } = data;
    const initialRating = 0;
    try {
      const result = await prismaClient.tour.create({
        data: {
          ...tourdata,
          rating: initialRating,
          categories: {
            create: data.categoriesIds.map((categoryId) => ({
              category: {
                connect: { id: categoryId },
              },
            })),
          },
        },
      });
      return { createdTourId: result.id, error: null };
    } catch (error) {
      console.error('Error creating tour: ', error);
      return { createdTourId: null, error: 'Internal Server Error' };
    }
  }
}
