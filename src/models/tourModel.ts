import { IsDateString, IsNotEmpty, IsString, IsNumber, IsArray } from "class-validator";

class Tour {
  @IsString({ message: "The id field must be a string" })
  @IsNotEmpty({ message: "The id field is mandatory" })
  id: string;

  @IsString({ message: "The title field must be a string" })
  @IsNotEmpty({ message: "The title field is mandatory" })
  title: string;

  @IsString({ message: "The img field must be a string" })
  @IsNotEmpty({ message: "The img field is mandatory" })
  img: string;

  @IsString({ message: "The overview field must be a string" })
  @IsNotEmpty({ message: "The overview field is mandatory" })
  overview: string;

  @IsString({ message: "The country id field must be a string" })
  @IsNotEmpty({ message: "The country id field is mandatory" })
  countryId: string;

  @IsString({ message: "The city field must be a string" })
  @IsNotEmpty({ message: "The city field is mandatory" })
  city: string;

  @IsNumber({}, { message: "The longitude field must be a string" })
  @IsNotEmpty({ message: "The longitude field is mandatory" })
  longitude: number;

  @IsNumber({}, { message: "The latitude field must be a string" })
  @IsNotEmpty({ message: "The latitude field is mandatory" })
  latitude: number;

  @IsNumber({}, { message: "The price field must be a string" })
  @IsNotEmpty({ message: "The price field is mandatory" })
  price: number;

  @IsDateString({}, { message: "The initial date field must be a date string" })
  @IsNotEmpty({ message: "The initial date field is mandatory" })
  initialDate: Date;

  @IsDateString({}, { message: "The final date field must be a date string" })
  @IsNotEmpty({ message: "The final date field is mandatory" })
  finalDate: Date;

  @IsNumber({}, { message: "The max people field must be a number" })
  @IsNotEmpty({ message: "The max people field is mandatory" })
  maxPeople: number;

  @IsNumber({}, { message: "The minimum age field must be a number" })
  @IsNotEmpty({ message: "The minimum age field is mandatory" })
  minAge: number;

  constructor(payload: Tour) {
    this.id = typeof payload.id === "string" ? payload.id.trim() : payload.id;

    this.title = typeof payload.title === "string" ? payload.title.trim() : payload.title;
    this.img = typeof payload.img === "string" ? payload.img.trim() : payload.img;
    this.overview = typeof payload.overview === "string" ? payload.overview.trim() : payload.overview;
    this.countryId = typeof payload.countryId === "string" ? payload.countryId.trim() : payload.countryId;
    this.city = typeof payload.city === "string" ? payload.city.trim() : payload.city;
    this.longitude = payload.longitude
    this.latitude = payload.latitude

    this.price = payload.price
    this.initialDate = payload.initialDate
    this.finalDate = payload.finalDate
    this.maxPeople = payload.maxPeople
    this.minAge = payload.minAge
  }
}

class TourInsert {
  @IsString({ message: "The title field must be a string" })
  @IsNotEmpty({ message: "The title field is mandatory" })
  title: string;

  @IsString({ message: "The img field must be a string" })
  @IsNotEmpty({ message: "The img field is mandatory" })
  img: string;

  @IsString({ message: "The overview field must be a string" })
  @IsNotEmpty({ message: "The overview field is mandatory" })
  overview: string;

  @IsString({ message: "The country id field must be a string" })
  @IsNotEmpty({ message: "The country id field is mandatory" })
  countryId: string;

  @IsString({ message: "The city field must be a string" })
  @IsNotEmpty({ message: "The city field is mandatory" })
  city: string;

  @IsNumber({}, { message: "The longitude field must be a string" })
  @IsNotEmpty({ message: "The longitude field is mandatory" })
  longitude: number;

  @IsNumber({}, { message: "The latitude field must be a string" })
  @IsNotEmpty({ message: "The latitude field is mandatory" })
  latitude: number;

  @IsNumber({}, { message: "The price field must be a string" })
  @IsNotEmpty({ message: "The price field is mandatory" })
  price: number;

  @IsDateString({}, { message: "The initial date field must be a date string" })
  @IsNotEmpty({ message: "The initial date field is mandatory" })
  initialDate: Date;

  @IsDateString({}, { message: "The final date field must be a date string" })
  @IsNotEmpty({ message: "The final date field is mandatory" })
  finalDate: Date;

  @IsNumber({}, { message: "The max people field must be a number" })
  @IsNotEmpty({ message: "The max people field is mandatory" })
  maxPeople: number;

  @IsNumber({}, { message: "The minimum age field must be a number" })
  @IsNotEmpty({ message: "The minimum age field is mandatory" })
  minAge: number;

  @IsArray({ message: 'The category ids field must be an array' })
  @IsNotEmpty({ message: 'The category ids field is mandatory' })
  categoriesIds: Array<number>

  constructor(payload: TourInsert) {
    this.title = typeof payload.title === "string" ? payload.title.trim() : payload.title;
    this.img = typeof payload.img === "string" ? payload.img.trim() : payload.img;
    this.overview = typeof payload.overview === "string" ? payload.overview.trim() : payload.overview;
    this.countryId = typeof payload.countryId === "string" ? payload.countryId.trim() : payload.countryId;
    this.city = typeof payload.city === "string" ? payload.city.trim() : payload.city;
    this.longitude = payload.longitude
    this.latitude = payload.latitude
    this.categoriesIds = payload.categoriesIds

    this.price = payload.price
    this.initialDate = payload.initialDate
    this.finalDate = payload.finalDate
    this.maxPeople = payload.maxPeople
    this.minAge = payload.minAge
  }
}

export { Tour, TourInsert }