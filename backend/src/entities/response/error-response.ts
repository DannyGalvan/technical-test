import { IsArray, IsString, ValidateNested } from "class-validator";
import { ApiResponse } from "./api-response";
import { Type } from "class-transformer";


export class ErrorApi {
    @IsString()
    code!: string;
    @IsString()
    message!: string;
    @IsString()
    path!: string;
}


export class ErrorApiResponse extends ApiResponse<ErrorApi[]> {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ErrorApi)
    data!: ErrorApi[];
}