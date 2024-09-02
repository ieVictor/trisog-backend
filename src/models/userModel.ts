import { IsNotEmpty, IsString, IsEmail } from "class-validator";

class User {
  @IsString({ message: "The id field must be a string" })
  @IsNotEmpty({ message: "The id field is mandatory" })
  id: string;

  @IsEmail({}, { message: "The email field must be a string" })
  @IsNotEmpty({ message: "The email field is mandatory" })
  email: string;

  @IsString({ message: "The username field must be a string" })
  @IsNotEmpty({ message: "The username field is mandatory" })
  username: string;

  @IsString({ message: "The img field must be a string" })
  img: string;

  constructor(payload: User) {
    this.id = typeof payload.id === "string" ? payload.id.trim() : payload.id;
    this.email = typeof payload.email === "string" ? payload.email.trim() : payload.email;
    this.img = typeof payload.img === "string" ? payload.img.trim() : payload.img;
    this.username = typeof payload.username === "string" ? payload.username.trim() : payload.username;
  }
}

class UserInsert {
  @IsString({ message: "The id field must be a string" })
  @IsNotEmpty({ message: "The id field is mandatory" })
  id: string;

  @IsEmail({}, { message: "The email field must be a string" })
  @IsNotEmpty({ message: "The email field is mandatory" })
  email: string;

  img: string;

  @IsString({ message: "The username field must be a string" })
  @IsNotEmpty({ message: "The username field is mandatory" })
  username: string;

  constructor(payload: User) {
    this.id = typeof payload.id === "string" ? payload.id.trim() : payload.id;
    this.email = typeof payload.email === "string" ? payload.email.trim() : payload.email;
    this.img = typeof payload.img === "string" ? payload.img.trim() : payload.img;
    this.username = typeof payload.username === "string" ? payload.username.trim() : payload.username;
  }
}

export { User, UserInsert }