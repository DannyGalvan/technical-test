import { ApiResponse, ApiResponseDoc } from "./api-response";
import { UserResponse } from "./user-response";
import { IsArray, IsBoolean, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class ApiResponseUserListDoc {
    @IsBoolean()
    success!: boolean;

    @IsString()
    message!: string;

    @IsNumber()
    totalResults!: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UserResponse)
    data!: UserResponse[];
}

export class ApiResponseUser extends ApiResponseDoc {
    @ValidateNested()
    @Type(() => UserResponse)
    data!: UserResponse;
}

export class ApiResponseEmpty extends ApiResponse<null> {
    data!: null;
}
