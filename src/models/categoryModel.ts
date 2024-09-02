import { IsNotEmpty, IsString, IsNumber } from "class-validator";

class Category {
  @IsNumber({},{ message: "The category id field must be a number" })
  @IsNotEmpty({ message: "The category id field is mandatory" })
  id: number;

  @IsString({ message: "The name field must be a string" })
  @IsNotEmpty({ message: "The name field is mandatory" })
  name: string;

  constructor(payload: Category) {
    this.id = payload.id 
    this.name = typeof payload.name === "string" ? payload.name.trim() : payload.name;
  }
}

export { Category }