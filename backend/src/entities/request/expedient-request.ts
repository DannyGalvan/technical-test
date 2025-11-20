import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { ExpedientItemRequest } from "./expedient-item-request";
import { Type } from "class-transformer";

export class ExpedientRequest {
    @IsNumber()
    @IsOptional()
    id?: number;
    @IsOptional()
    @IsNumber()
    userId?: number;
    @IsOptional()
    @IsNumber()
    authorizeUserId?: number;
    @IsOptional()
    @IsString()
    description: string;
    @IsString()
    @IsOptional()
    comments?: string;
    @IsOptional()
    @IsNumber()
    documentStatusId?: number;
    @IsOptional()
    @IsBoolean()
    state?: boolean;
    @IsOptional()
    @IsString()
    createdBy?: number;
    @IsOptional()
    @IsString()
    updatedBy?: number;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ExpedientItemRequest)
    @IsArray()
    items: ExpedientItemRequest[];
}