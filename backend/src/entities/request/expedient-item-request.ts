import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";


export class ExpedientItemRequest {
    @IsNumber()
    @IsOptional()
    id?: number;
    @IsNumber()
    expedientId: number;
    @IsString()
    description: string;
    @IsString()
    color: string;
    @IsString()
    size: string;
    @IsNumber()
    weight: number;
    @IsString()
    location: string;
    @IsOptional()
    @IsNumber()
    userId?: number;
    @IsBoolean()
    @IsOptional()
    state?: boolean;
}