import { injectable, inject } from "inversify";
import { JsonController, Post, Body } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { TYPES } from "@/config/container-types";
import { AuthService } from "@/services/auth-service";
import { AuthResponse } from "@/entities/request/auth-response";
import { RegisterDTO } from "@/entities/request/register-dto";
import { LoginDTO } from "@/entities/request/login-dto";
import { ApiResponse } from "@/entities/response/api-response";
import { ErrorApi } from "@/entities/response/error-response";

@JsonController('/api/auth')
@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.AuthService) private authService: AuthService
  ) { }

  @Post('/register')
  @OpenAPI({
    summary: 'Registrar nuevo usuario',
    description: 'Crea una nueva cuenta de usuario',
    tags: ['Auth'],
  })
  async register(@Body() data: RegisterDTO) {
    const response = await this.authService.register(data);

    if (!response.success) {
      const error: ApiResponse<ErrorApi[]> = {
        success: false,
        message: response.message,
        data: response.Error,
        totalResults: 0,
      };
      return error;
    }

    const success: ApiResponse<AuthResponse | null> = {
      success: true,
      message: response.message,
      data: response.data,
      totalResults: response.totalResults,
    };

    return success;
  }

  @Post('/login')
  @OpenAPI({
    summary: 'Iniciar sesión',
    description: 'Autentica un usuario y retorna un token JWT',
    tags: ['Auth'],
  })
  async login(@Body() data: LoginDTO) {
    const response = await this.authService.login(data);

    if (!response.success) {
      const error: ApiResponse<ErrorApi[]> = {
        success: false,
        message: response.message,
        data: response.Error,
        totalResults: 0,
      };
      return error;
    }

    const success: ApiResponse<AuthResponse | null> = {
      success: true,
      message: response.message,
      data: response.data,
      totalResults: response.totalResults,
    };

    return success;
  }
}