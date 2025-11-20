import { IsBoolean, IsNumber, IsString } from "class-validator";
import { ErrorApi } from "./error-response";

export class ApiResponseWithErrors<T> {
  success!: boolean;
  data: T | null;
  Error!: ErrorApi[];
  message!: string;
  totalResults!: number;
}


export class ApiResponse<T> {
  @IsBoolean()
  success!: boolean;
  data: T;
  @IsString()
  message!: string;
  @IsNumber()
  totalResults!: number;
}


export class ApiResponseDoc {
  @IsBoolean()
  success!: boolean;
  @IsString()
  message!: string;
  @IsNumber()
  totalResults!: number;
}
