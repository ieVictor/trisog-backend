import { Response, Request } from "express";
import { SearchService } from "../services/searchService";

export class SearchController {
  static async searchTours(req: Request, res: Response): Promise<Response> {
    const { destination, types, date, guests } = req.query

    const validDestination = typeof destination === 'string' ? destination : '';
    const validDate = typeof date === 'string' ? date : '';
    const validGuests = typeof guests === 'string' ? guests : '';

    let typesIdsArray: number[]
    if (Array.isArray(types)) typesIdsArray = types.map(id => Number(id));
    else typesIdsArray = [Number(types)];

    const { tours, error: searchError } = await SearchService.searchTours({
      destination: validDestination, 
      types: typesIdsArray, 
      date: validDate, 
      guests: validGuests
    });
    if (searchError) return res.status(500).json({ msg: searchError });
    if (!tours) return res.status(404).json({ msg: 'No data found'});

    return res.status(200).json(tours);
  }
}