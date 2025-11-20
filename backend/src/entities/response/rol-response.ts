import { IsNumber, IsString } from "class-validator";

export class RolResponse {
    @IsNumber()
    id?: number;
    @IsString()
    name?: string;
    @IsString()
    description?: string;
    @IsNumber()
    createdBy?: number;
    @IsNumber()
    updatedBy?: number;
    @IsString()
    createdAt?: Date;
    @IsString()
    updatedAt?: Date;
}