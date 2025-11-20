import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { ExpedientItemRequest } from "./expedient-item-request";
import { Type } from "class-transformer";


export class ExpedientRequest {
    @IsNumber()
    @IsOptional()
    id?: number;
    @IsNumber()
    userId: number;
    @IsOptional()
    @IsNumber()
    authorizeUserId?: number;
    @IsString()
    description: string;
    @IsOptional()
    @IsBoolean()
    state?: boolean;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ExpedientItemRequest)
    @IsArray()
    items: ExpedientItemRequest[];
}