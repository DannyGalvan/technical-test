import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UserRequest {
    @IsOptional()
    @IsNumber()
    id?: number;
    @IsNumber()
    rolId?: number;
    @IsString()
    name?: string;
    @IsString()
    email?: string;
    @IsString()
    password?: string;
    @IsOptional()
    @IsBoolean()
    state?: boolean;
    @IsOptional()
    @IsNumber()
    createdBy?: number;
    @IsOptional()
    @IsNumber()
    updatedBy?: number;
}