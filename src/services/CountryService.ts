import { Country, CountryInsert } from '../models/countryModel';
import country from 'countryjs';
import prismaClient from '../utils/database';

export class CountryService {
  static async getCountries(): Promise<{
    countries: Country[] | null;
    error: string | null;
  }> {
    try {
      const countries = await prismaClient.country.findMany();
      return { countries, error: null };
    } catch (error) {
      console.error('Error retrieving countries: ', error);
      return { countries: null, error: 'Internal server error' };
    }
  }

  static async getCountryById(country_id: string): Promise<{
    country: Country | null;
    error: string | null;
  }> {
    try {
      const country = await prismaClient.country.findUnique({
        where: { id: country_id }
      });
      return { country, error: null };
    } catch (error) {
      console.error('Error retrieving countries: ', error);
      return { country: null, error: 'Internal server error' };
    }
  }

  static async createCountry(data: CountryInsert): Promise<{
    createdCountryId: string | null;
    error: string | null;
  }> {
    const latlng = country.latlng(data.isoCode) || [0, 0];
    try {
      const infos = {
        name: country.name(data.isoCode) || 'Not found',
        region: country.region(data.isoCode) || 'Not found',
        latitude: latlng[0],
        longitude: latlng[1],
        language: country.languages(data.isoCode)?.join(', ') || 'Not found',
        currency: country.currencies(data.isoCode)?.join(', ') || 'Not found',
        area: country.area(data.isoCode) || 0,
        population: country.population(data.isoCode) || 0,
        timeZone: country.timezones(data.isoCode)?.join(' ') || 'Not found',
        timeToTravel: 'May, June, July, August',
      };

      const result = await prismaClient.country.create({
        data: {
          ...data,
          ...infos,
        },
      });
      return { createdCountryId: result.id, error: null };
    } catch (error) {
      console.error('Error creating country: ', error);
      return { createdCountryId: null, error: 'Internal server error' };
    }
  }
}
