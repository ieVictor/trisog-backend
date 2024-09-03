import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

class Country {
  @IsString({ message: 'The id field must be a string' })
  @IsNotEmpty({ message: 'The id field is mandatory' })
  id: string;

  @IsString({ message: 'The isoCode field must be a string' })
  @IsNotEmpty({ message: 'The isoCode field is mandatory' })
  isoCode: string;

  @IsString({ message: 'The title field must be a string' })
  @IsNotEmpty({ message: 'The title field is mandatory' })
  title: string;

  @IsString({ message: 'The region field must be a string' })
  @IsNotEmpty({ message: 'The region field is mandatory' })
  region: string;

  @IsString({ message: 'The img field must be a string' })
  @IsNotEmpty({ message: 'The img field is mandatory' })
  img: string;

  @IsString({ message: 'The name field must be a string' })
  @IsNotEmpty({ message: 'The name field is mandatory' })
  name: string;

  @IsString({ message: 'The overview field must be a string' })
  @IsOptional()
  overview: string;

  @IsNumber({}, { message: 'The latitude field must be a number' })
  @IsNotEmpty({ message: 'The latitude field is mandatory' })
  latitude: number;

  @IsNumber({}, { message: 'The longitude field must be a number' })
  @IsNotEmpty({ message: 'The longitude field is mandatory' })
  longitude: number;

  @IsNumber({}, { message: 'The area field must be a number' })
  @IsNotEmpty({ message: 'The area field is mandatory' })
  area: number;

  @IsNumber({}, { message: 'The population field must be a number' })
  @IsNotEmpty({ message: 'The population field is mandatory' })
  population: number;

  @IsString({ message: 'The timeZone field must be a string' })
  @IsNotEmpty({ message: 'The timeZone field is mandatory' })
  timeZone: string;

  @IsString({ message: 'The timeToTravel field must be a string' })
  @IsNotEmpty({ message: 'The time to travel field is mandatory' })
  timeToTravel: string;

  @IsString({ message: 'The language field must be a string' })
  @IsNotEmpty({ message: 'The language field is mandatory' })
  language: string;

  @IsString({ message: 'The currency field must be a string' })
  @IsNotEmpty({ message: 'The currency field is mandatory' })
  currency: string;

  constructor(payload: Country) {
    this.id = typeof payload.id === 'string' ? payload.id.trim() : payload.id;
    this.isoCode =
      typeof payload.isoCode === 'string'
        ? payload.isoCode.trim()
        : payload.isoCode;
    this.title =
      typeof payload.title === 'string' ? payload.title.trim() : payload.title;
    this.region =
      typeof payload.region === 'string' ? payload.region.trim() : payload.region;
    this.img =
      typeof payload.img === 'string' ? payload.img.trim() : payload.img;
    this.name =
      typeof payload.name === 'string' ? payload.name.trim() : payload.name;
    this.overview =
      typeof payload.overview === 'string'
        ? payload.overview.trim()
        : payload.overview;
    this.latitude = payload.latitude;
    this.longitude = payload.longitude;
    this.area = payload.area;
    this.population = payload.population;
    this.timeZone =
      typeof payload.timeZone === 'string'
        ? payload.timeZone.trim()
        : payload.timeZone;
    this.timeToTravel =
      typeof payload.timeToTravel === 'string'
        ? payload.timeToTravel.trim()
        : payload.timeToTravel;
    this.language =
      typeof payload.language === 'string'
        ? payload.language.trim()
        : payload.language;
    this.currency =
      typeof payload.currency === 'string'
        ? payload.currency.trim()
        : payload.currency;
  }
}

class CountryInsert {
  @IsString({ message: 'The isoCode field must be a string' })
  @IsNotEmpty({ message: 'The isoCode field is mandatory' })
  isoCode: string;

  @IsString({ message: 'The title field must be a string' })
  @IsNotEmpty({ message: 'The title field is mandatory' })
  title: string;

  @IsString({ message: 'The img field must be a string' })
  @IsNotEmpty({ message: 'The img field is mandatory' })
  img: string;
  
  @IsString({ message: 'The overview field must be a string' })
  @IsOptional()
  overview: string;

  @IsString({ message: 'The name field must be a string' })
  @IsOptional()
  name: string;

  @IsNumber({}, { message: 'The latitude field must be a number' })
  @IsOptional()
  latitude: number;

  @IsNumber({}, { message: 'The longitude field must be a number' })
  @IsOptional()
  longitude: number;

  @IsNumber({}, { message: 'The area field must be a number' })
  @IsOptional()
  area: number;

  @IsNumber({}, { message: 'The population field must be a number' })
  @IsOptional()
  population: number;

  @IsString({ message: 'The timeZone field must be a string' })
  @IsOptional()
  timeZone: string;

  @IsString({ message: 'The timeToTravel field must be a string' })
  @IsOptional()
  timeToTravel: string;

  @IsString({ message: 'The language field must be a string' })
  @IsOptional()
  language: string;

  @IsString({ message: 'The currency field must be a string' })
  @IsOptional()
  currency: string;

  constructor(payload: CountryInsert) {
    this.isoCode =
      typeof payload.isoCode === 'string'
        ? payload.isoCode.trim()
        : payload.isoCode;
    this.title =
      typeof payload.title === 'string' ? payload.title.trim() : payload.title;
    this.img =
      typeof payload.img === 'string' ? payload.img.trim() : payload.img;
    this.overview =
      typeof payload.overview === 'string'
        ? payload.overview.trim()
        : payload.overview;
    this.name =
      typeof payload.name === 'string' ? payload.name.trim() : payload.name;
    this.latitude = payload.latitude;
    this.longitude = payload.longitude;
    this.area = payload.area;
    this.population = payload.population;
    this.timeZone =
      typeof payload.timeZone === 'string'
        ? payload.timeZone.trim()
        : payload.timeZone;
    this.timeToTravel =
      typeof payload.timeToTravel === 'string'
        ? payload.timeToTravel.trim()
        : payload.timeToTravel;
    this.language =
      typeof payload.language === 'string'
        ? payload.language.trim()
        : payload.language;
    this.currency =
      typeof payload.currency === 'string'
        ? payload.currency.trim()
        : payload.currency;
  }
}

export { Country, CountryInsert };
