import { Review } from "@prisma/client";
import prismaClient from "../utils/database";
import { ReviewInsert } from "../models/reviewModel";
import updateTourRating from "../utils/updateRating";

export class ReviewService {
  static async getReviews(): Promise<{ reviews: Review[] | null, error: string | null}> {
    try {
      const reviews = await prismaClient.review.findMany();
      return { reviews, error: null };
    } catch (error) {
      console.error('Error retrieving reviews: ', error);
      return { reviews: null, error: 'Internal server error'};
    }
  }

  static async getReviewsByTourId(tour_id: string): Promise<{ reviews: Review[] | null, error: string | null}> {
    try {
      const reviews = await prismaClient.review.findMany({
        where: {
          tourId: tour_id
        },
        include: {
          user: true
        }
      });

      if (reviews) return { reviews, error: null};
      return { reviews: null, error: null };
    } catch (error) {
      console.error('Error retrieving tour reviews: ', error);
      return { reviews: null, error: 'Internal server error'};
    }
  }

  static async createReview(data: ReviewInsert): Promise<{createdReviewId: string | null, error: string | null}> {
    try {
      const { services, locations, amenities, prices, food, room } = data;

      const average = parseFloat((
        (services + locations + amenities + prices + food + room) / 6
      ).toFixed(1));

      const result = await prismaClient.review.create({
        data: { 
          ...data, 
          average
        }
      })

      await updateTourRating(data.tourId);
      return { createdReviewId: result.id, error: null};
    } catch (error) {
      console.error('Error creating review: ', error);
      return { createdReviewId: null, error: 'Internal server error'};
    }
  }
}