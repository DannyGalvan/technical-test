import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNumber, IsString, ValidateNested } from "class-validator";
import { Authorizations } from "../response/autorizations-response";


export class AuthResponse {
    @IsString()
    name: string;
    @IsString()
    email: string;
    @IsString()
    token: string;
    @IsBoolean()
    redirect: boolean;
    @IsNumber()
    userId: number;
    @IsNumber()
    rol: number;

    @ValidateNested()
    @Type(() => Authorizations)
    @IsArray()
    operations: Authorizations[];
}