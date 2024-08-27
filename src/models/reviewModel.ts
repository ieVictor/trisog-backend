import { IsNotEmpty, IsString, IsNumber, IsDateString } from "class-validator";

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

  @IsString({ message: "The overview field must be a string" })
  @IsNotEmpty({ message: "The overview field is mandatory" })
  overview: string;

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

  constructor(payload: ReviewInsert) {
    this.tourId = typeof payload.tourId === "string" ? payload.tourId.trim() : payload.tourId;
    this.userId = typeof payload.userId === "string" ? payload.userId.trim() : payload.userId;
    this.overview = typeof payload.overview === "string" ? payload.overview.trim() : payload.overview;
    this.services = payload.services;
    this.locations = payload.locations;
    this.amenities = payload.amenities;
    this.prices = payload.prices;
    this.food = payload.food;
    this.room = payload.room;
  }
}

export { Review, ReviewInsert } 