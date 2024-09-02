import { Router } from "express";
import { ReviewController } from "../controllers/reviewController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get('/', authMiddleware, ReviewController.getReviews);
router.get('/counter', authMiddleware, ReviewController.getReviewsCounter);
router.get('/:tour_id', authMiddleware, ReviewController.getReviewsByTourId);

router.post('/', authMiddleware, ReviewController.createReview);
router.delete('/:review_id', authMiddleware, ReviewController.deleteReview);

export default router