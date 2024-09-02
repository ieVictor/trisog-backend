import { Request, Response } from 'express';
import { TourService } from '../services/TourService';
import { TourInsert } from '../models/tourModel';
import { validate } from 'class-validator';
import { parseCategoriesQuery, parseCountriesQuery } from '../utils/parseQuery';

export class TourController {
  static async getTours(req: Request, res: Response): Promise<Response> {
    const {
      sortBy,
      sortDirection,
      page,
      limit,
      categories,
      price,
      rating,
      countries,
      search,
      date,
      guests
    } = req.query;
    

    const categoriesIdsArray: number[] = parseCategoriesQuery(categories)
    const countriesArray: string[] = parseCountriesQuery(countries);

    const { tours, error: getToursError } = await TourService.getTours(
      sortBy as string,
      sortDirection as string,
      parseInt(page as string, 10),
      parseInt(limit as string, 10),
      categoriesIdsArray,
      Number(price),
      Number(rating),
      countriesArray,
      search as string,
      date as string,
      Number(guests)
    );

    if (getToursError) return res.status(500).json({ msg: getToursError });
    return res.status(200).json(tours);
  }

  static async getToursByCategories(
    req: Request,
    res: Response
  ): Promise<Response> {
    const categories = req.query.categories;
    if (!categories)
      return res.status(400).json({ msg: 'Invalid categories list' });

    let categoriesIdsArray: number[];
    if (Array.isArray(categories))
      categoriesIdsArray = categories.map((id) => Number(id));
    else categoriesIdsArray = [Number(categories)];

    const { tours, error: getToursError } =
      await TourService.getToursByCategories(categoriesIdsArray);
    if (getToursError) return res.status(500).json({ msg: getToursError });
    if (!tours) return res.status(404).json({ msg: 'No data found' });

    return res.status(200).json(tours);
  }

  static async getTourById(req: Request, res: Response): Promise<Response> {
    const tourId = req.params.tour_id;
    if (!tourId) return res.status(400).json({ msg: 'Invalid tour ID' });

    const { tour, error: getTourError } = await TourService.getTourById(tourId);
    if (getTourError) return res.status(500).json({ msg: getTourError });
    if (!tour) return res.status(404).json({ msg: 'No data found' });

    return res.status(200).json(tour);
  }

  static async createTour(req: Request, res: Response): Promise<Response> {
    const payload = new TourInsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints
        ? Object.values(firstError.constraints)[0]
        : 'Invalid and/or incomplete parameters';
      return res.status(400).json({ msg: errorMessage });
    }

    const { createdTourId, error: createTourError } =
      await TourService.createTour(payload);
    if (createTourError) return res.status(500).json({ msg: createTourError });
    if (!createdTourId || createdTourId === '')
      return res.status(404).json({ msg: 'No data found' });

    const { tour, error: getTourError } = await TourService.getTourById(
      createdTourId
    );
    if (getTourError) return res.status(500).json({ msg: getTourError });
    if (!tour) return res.status(404).json({ msg: 'No data found' });

    return res.status(201).json(tour);
  }
}
