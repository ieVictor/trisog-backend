import { Router } from "express";
import { ReviewController } from "../controllers/reviewController";

const router = Router();

router.get('/', ReviewController.getReviews);
router.get('/:tour_id', ReviewController.getReviewsByTourId);

router.post('/', ReviewController.createReview);

export default router