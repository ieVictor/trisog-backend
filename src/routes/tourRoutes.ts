import { Router } from "express";
import { TourController } from "../controllers/tourController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get('/', TourController.getTours);
router.get('/categories/', TourController.getToursByCategories);
router.get('/:tour_id', TourController.getTourById);

router.post('/', TourController.createTour);

export default router