import { IsBoolean, IsNumber, IsString } from "class-validator";

export class OperationResponse {
    @IsNumber()
    id!: number;
    @IsString()
    guid!: string;
    @IsString()
    name!: string;
    @IsString()
    description!: string;
    @IsString()
    policy!: string;
    @IsString()
    icon!: string;
    @IsString()
    path!: string;
    @IsBoolean()
    isVisible!: boolean;
}