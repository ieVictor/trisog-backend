import { validate } from "class-validator";
import { ReviewInsert } from "../models/reviewModel";
import { ReviewService } from "../services/ReviewService";
import { Request, Response } from 'express';
import { isValidUUID } from "../utils/validate";

export class ReviewController {
  static async getReviews(req: Request, res: Response): Promise<Response> {
    const { reviews, error: getReviewsError } = await ReviewService.getReviews();
    if (getReviewsError) return res.status(500).json({ msg: getReviewsError });
    return res.status(200).json(reviews)
  }

  static async getReviewsByTourId(req: Request, res: Response): Promise<Response> {
    const tourId = req.params.tour_id;
    if (!tourId) return res.status(400).json({ msg: 'Invalid tour ID' });

    const { reviews, error: getReviewsError } = await ReviewService.getReviewsByTourId(tourId);
    if (getReviewsError) return res.status(500).json({ msg: getReviewsError});
    if (!reviews) return res.status(400).json({ msg: 'No data found' });

    return res.status(200).json(reviews);
  }

  static async createReview(req: Request, res: Response): Promise<Response> {
    const anonymous = req.query.anonymous === 'true';
    const payload = new ReviewInsert(req.body);
    payload.anonymous = anonymous

    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints ? Object.values(firstError.constraints)[0] : "Invalid and/or incomplete parameters";
      return res.status(400).json({ msg: errorMessage });
    }

    const { createdReviewId, error: createTourError } = await ReviewService.createReview(payload);
    if (createTourError) return res.status(500).json({ msg: createTourError });
    if (!createdReviewId || createdReviewId === '') return res.status(404).json({ msg: 'No data found'});

    const { review, error: getReviewError } = await ReviewService.getReviewById(createdReviewId);
    if (getReviewError) return res.status(500).json({ msg: getReviewError });
    if (!review) return res.status(404).json({ msg: 'No data found' });

    return res.status(201).json(review);
  }

  static async deleteReview(req: Request, res: Response): Promise<Response> {
    const reviewId = req.params.review_id
    if (!isValidUUID(reviewId)) return res.status(400).json({ msg: 'Provide a valid review id to be deleted'});
    const { deletedReview, error: deletedReviewError } = await ReviewService.deleteReview(reviewId);
    if (!deletedReview) return res.status(500).json({ msg: deletedReviewError });
    return res.status(200).json({ msg: 'Successfully delete!' });
  }
}