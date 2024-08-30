import { IsNotEmpty, IsString, IsNumber, IsDateString, isBoolean, IsBoolean, Min, Matches } from "class-validator";

class Review {
  @IsString({ message: "The id field must be a string" })
  @IsNotEmpty({ message: "The id field is mandatory" })
  id: string;

  @IsNumber({}, { message: "The tour id field must be a number" })
  @IsNotEmpty({ message: "The tour id field is mandatory" })
  tourId: string;

  @IsString({ message: "The overview field must be a string" })
  @IsNotEmpty({ message: "The overview field is mandatory" })
  overview: string;

  @IsNumber({}, { message: "The average field must be a number" })
  @IsNotEmpty({ message: "The average field is mandatory" })
  average: number;

  @IsNumber({}, { message: "The services field must be a number" })
  @IsNotEmpty({ message: "The services field is mandatory" })
  services: number;

  @IsNumber({}, { message: "The locations field must be a number" })
  @IsNotEmpty({ message: "The locations field is mandatory" })
  locations: number;

  @IsNumber({}, { message: "The amenities field must be a number" })
  @IsNotEmpty({ message: "The amenities field is mandatory" })
  amenities: number;

  @IsNumber({}, { message: "The prices field must be a number" })
  @IsNotEmpty({ message: "The prices field is mandatory" })
  prices: number;

  @IsNumber({}, { message: "The food field must be a number" })
  @IsNotEmpty({ message: "The food field is mandatory" })
  food: number;

  @IsNumber({}, { message: "The room field must be a number" })
  @IsNotEmpty({ message: "The room field is mandatory" })
  room: number;

  @IsDateString({}, { message: "The createdAt field must be a string date" })
  @IsNotEmpty({ message: "The createdAt field is mandatory" })
  createdAt: Date;

  constructor(payload: Review) {
    this.id = typeof payload.id === "string" ? payload.id.trim() : payload.id;
    this.tourId = typeof payload.tourId === "string" ? payload.tourId.trim() : payload.tourId;
    this.overview = typeof payload.overview === "string" ? payload.overview.trim() : payload.overview;
    this.average = payload.average;
    this.services = payload.services;
    this.locations = payload.locations;
    this.amenities = payload.amenities;
    this.prices = payload.prices;
    this.food = payload.food;
    this.room = payload.room;
    this.createdAt = payload.createdAt;
  }
}

class ReviewInsert {
  @IsString({ message: "The tour id field must be a string" })
  @IsNotEmpty({ message: "The tour id field is mandatory" })
  tourId: string;

  @IsString({ message: "The user id field must be a string" })
  @IsNotEmpty({ message: "The user id field is mandatory" })
  userId: string;

  @IsString({ message: "The email field must be a string" })
  @IsNotEmpty({ message: "The email field mandatory" })
  creatorEmail: string;

  @IsString({ message: "The creator name field must be a string" })
  @IsNotEmpty({ message: "The review creator name is mandatory" })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ'\- ]{2,}$/, { message: 'The creator name must not contain numbers'})
  creatorName: string;

  @IsString({ message: "The comment field must be a string" })
  @IsNotEmpty({ message: "The comment field is mandatory" })
  overview: string;

  @IsNumber({}, { message: "The services field must be a number" })
  @IsNotEmpty({ message: "The services field is mandatory" })
  @Min(1, { message: "The services field must be greater than 0" })
  services: number;

  @IsNumber({}, { message: "The locations field must be a number" })
  @IsNotEmpty({ message: "The locations field is mandatory" })
  @Min(1, { message: "The locations field must be greater than 0" })
  locations: number;

  @IsNumber({}, { message: "The amenities field must be a number" })
  @IsNotEmpty({ message: "The amenities field is mandatory" })
  @Min(1, { message: "The amenities field must be greater than 0" })
  amenities: number;

  @IsNumber({}, { message: "The prices field must be a number" })
  @IsNotEmpty({ message: "The prices field is mandatory" })
  @Min(1, { message: "The prices field must be greater than 0" })
  prices: number;

  @IsNumber({}, { message: "The food field must be a number" })
  @IsNotEmpty({ message: "The food field is mandatory" })
  @Min(1, { message: "The food field must be greater than 0" })
  food: number;

  @IsNumber({}, { message: "The room field must be a number" })
  @IsNotEmpty({ message: "The room field is mandatory" })
  @Min(1, { message: "The room field must be greater than 0" })
  room: number;

  @IsBoolean({message: 'The anonymous flag must be a boolean'})
  anonymous: boolean;

  constructor(payload: ReviewInsert) {
    this.tourId = typeof payload.tourId === "string" ? payload.tourId.trim() : payload.tourId;
    this.userId = typeof payload.userId === "string" ? payload.userId.trim() : payload.userId;
    this.overview = typeof payload.overview === "string" ? payload.overview.trim() : payload.overview;
    this.creatorEmail = typeof payload.creatorEmail === "string" ? payload.creatorEmail.trim() : payload.creatorEmail;
    this.creatorName = typeof payload.creatorName === "string" ? payload.creatorName.trim() : payload.creatorName;
    this.services = payload.services;
    this.locations = payload.locations;
    this.amenities = payload.amenities;
    this.prices = payload.prices;
    this.food = payload.food;
    this.room = payload.room;
    this.anonymous = payload.anonymous
  }
}

export { Review, ReviewInsert } 