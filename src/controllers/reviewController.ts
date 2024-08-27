import { validate } from "class-validator";
import { ReviewInsert } from "../models/reviewModel";
import { ReviewService } from "../services/ReviewService";
import { Request, Response } from 'express';

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
    const payload = new ReviewInsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints ? Object.values(firstError.constraints)[0] : "Invalid and/or incomplete parameters";
      return res.status(400).json({ msg: errorMessage });
    }

    const { createdReviewId, error: createTourError } = await ReviewService.createReview(payload);
    if (createTourError) return res.status(500).json({ msg: createTourError });
    if (!createdReviewId || createdReviewId === '') return res.status(404).json({ msg: 'No data found'});

    const { reviews, error: getReviewError } = await ReviewService.getReviews();
    if (getReviewError) return res.status(500).json({ msg: getReviewError });
    if (!reviews) return res.status(404).json({ msg: 'No data found' });

    return res.status(201).json(reviews)
  }
}