import { Router } from "express";
import { ReviewController } from "../controllers/reviewController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get('/', ReviewController.getReviews);
router.get('/counter', ReviewController.getReviewsCounter);
router.get('/:tour_id', ReviewController.getReviewsByTourId);

router.post('/', authMiddleware, ReviewController.createReview);
router.delete('/:review_id', authMiddleware, ReviewController.deleteReview);

export default router