import { Router } from "express";
import { TourController } from "../controllers/tourController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get('/', TourController.getTours);
router.get('/categories/', TourController.getToursByCategories);
router.get('/:tour_id', authMiddleware,TourController.getTourById);

router.post('/', authMiddleware, TourController.createTour);

export default router