import { Type } from "class-transformer";
import { AuthResponse } from "../request/auth-response";
import { ApiResponse } from "./api-response";
import { ValidateNested } from "class-validator";


export class ApiResponseAuthResponse extends ApiResponse<AuthResponse> {
    @ValidateNested()
    @Type(() => AuthResponse)
    data!: AuthResponse;
}