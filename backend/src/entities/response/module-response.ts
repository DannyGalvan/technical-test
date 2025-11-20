import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ModuleResponse {
    @IsNumber()
    id!: number;
    @IsString()
    name!: string;
    @IsString()
    description!: string;
    @IsString()
    image!: string;
    @IsString()
    path!: string;
    @IsBoolean()
    state!: boolean;
}