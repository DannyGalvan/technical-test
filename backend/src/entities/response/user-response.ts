import { IsBoolean, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { RolResponse } from "./rol-response";

export class UserResponse {
    @IsNumber()
    id?: number;
    @IsNumber()
    rolId?: number;
    @IsString()
    name?: string;
    @IsString()
    email?: string;
    @IsBoolean()
    state?: boolean;
    @IsNumber()
    createdBy?: number;
    @IsNumber()
    updatedBy?: number;
    @IsString()
    createdAt?: Date;
    @IsString()
    updatedAt?: Date;
    @ValidateNested()
    @Type(() => RolResponse)
    rol?: RolResponse;
}