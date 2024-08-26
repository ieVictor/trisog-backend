import { Router } from "express";
import { TourController } from "../controllers/tourController";

const router = Router();

router.get('/', TourController.getTours);
router.get('/:tour_id', TourController.getTourById);

router.post('/', TourController.createTour);

export default router