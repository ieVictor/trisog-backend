import { Request, Response } from 'express';
import { TourService } from '../services/TourService';
import { TourInsert } from '../models/tourModel';
import { validate } from 'class-validator';

export class TourController {
  static async getTours(req: Request, res: Response): Promise<Response> {
    const { tours, error: getToursError } = await TourService.getTours();
    if (getToursError) return res.status(500).json({ msg: getToursError });
    return res.status(200).json(tours);
  }

  static async getTourById(req: Request, res: Response): Promise<Response> {
    const tourId = req.params.tour_id;
    if (!tourId) return res.status(400).json({ msg: 'Invalid tour ID'});

    const { tour, error: getTourError } = await TourService.getTourById(tourId);
    if (getTourError) return res.status(500).json({ msg: getTourError });
    if (!tour) return res.status(404).json({ msg: 'No data found'});

    return res.status(200).json(tour);
  }

  static async createTour(req: Request, res: Response): Promise<Response> {
    const payload = new TourInsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints ? Object.values(firstError.constraints)[0] : "Invalid and/or incomplete parameters";
      return res.status(400).json({ msg: errorMessage });
    }

    const { createdTourId, error: createTourError } = await TourService.createTour(payload);
    if (createTourError) return res.status(500).json({ msg: createTourError});
    if (!createdTourId || createdTourId === '') return res.status(404).json({msg: 'No data found'});

    const { tour, error: getTourError } = await TourService.getTourById(createdTourId);
    if (getTourError) return res.status(500).json({ msg: getTourError });
    if (!tour) return res.status(404).json({ msg: 'No data found'});

    return res.status(201).json(tour);
  }
}