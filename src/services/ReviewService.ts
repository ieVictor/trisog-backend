import { Review } from "@prisma/client";
import prismaClient from "../utils/database";
import { ReviewInsert } from "../models/reviewModel";
import { updateTourRating, updateTourRatingAfterReviewDeletion} from "../utils/updateRating";

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

  static async getReviewsCounter(): Promise<{ reviews: number | null, error: string | null}> {
    try {
      const reviews = await prismaClient.review.count();
      return { reviews, error: null };
    } catch (error) {
      console.error('Error retrieving reviews: ', error);
      return { reviews: null, error: 'Internal server error'};
    }
  }

  static async getReviewById(review_id: string): Promise<{ review: Review | null, error: string | null}> {
    try {
      const review = await prismaClient.review.findUnique({ where: { id: review_id } });
      if (review) return { review, error: null};
      return { review: null, error: null }

    } catch (error) {
      console.error('Error retrieving review: ', error);
      return { review: null, error: 'Internal server error' };
    }
  }

  static async getReviewsByTourId(tour_id: string): Promise<{ reviews: Review[] | null, error: string | null}> {
    try {
      const reviews = await prismaClient.review.findMany({
        where: {
          tourId: tour_id
        },
        include: {
          user: { include: { _count: { select: { reviews: true } } } } 
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

  static async deleteReview(review_id: string): Promise<{ deletedReview: Review | null, error: string | null}> {
    try {
      const result = await prismaClient.review.delete({
        where: { id: review_id },
      });
      await updateTourRatingAfterReviewDeletion(result.tourId);
      return { deletedReview: result, error: null};
    } catch (error) {
      console.error('Error deleting review: ', error);
      return { deletedReview: null, error: 'Internal server error' }
    }
  }
}