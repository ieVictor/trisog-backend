import { Request, Response } from 'express';
import { CountryService } from '../services/CountryService';
import { CountryInsert } from '../models/countryModel';
import { validate } from 'class-validator';

export class CountryController {
  static async getCountries(req: Request, res: Response): Promise<Response> {
    const { countries, error: getCountriesError } =
      await CountryService.getCountries();
    if (getCountriesError)
      return res.status(500).json({ msg: getCountriesError });
    if (!countries || countries.length === 0)
      return res.status(404).json({ msg: 'No data found' });
    return res.status(200).json(countries);
  }

  static async getCountryById(req: Request, res: Response): Promise<Response> {
    const countryId = req.params.country_id;
    if (!countryId) return res.status(400).json({ msg: 'Invalid tour ID' });

    const { country, error: getCountryError } = await CountryService.getCountryById(countryId);
    if (getCountryError) return res.status(500).json({ msg: getCountryError });
    if (!country) return res.status(404).json({ msg: 'No data found' });

    return res.status(200).json(country);
  }

  static async createCountry(req: Request, res: Response): Promise<Response> {
    const payload = new CountryInsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints
        ? Object.values(firstError.constraints)[0]
        : 'Invalid and/or incomplete parameters';
      return res.status(400).json({ msg: errorMessage });
    }

    const { createdCountryId, error: createCountryError } =
      await CountryService.createCountry(payload);
    if (createCountryError)
      return res.status(500).json({ msg: createCountryError });
    if (!createdCountryId || createdCountryId === '')
      return res.status(404).json({ msg: 'No data found' });

    const { country, error: getCountryError } =
      await CountryService.getCountryById(createdCountryId);
    if (getCountryError) return res.status(500).json({ msg: getCountryError });
    if (!country) return res.status(404).json({ msg: 'No data found' });

    return res.status(201).json(country);
  }
}
