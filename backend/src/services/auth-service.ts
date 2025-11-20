import { injectable, inject } from "inversify";
import { TYPES } from "@/config/container-types";
import { UserRepository } from "@/repository/user-repository";
import { JWTService } from "./jwt-service";
import { User } from "@/entities/models/user";
import { RegisterDTO } from "@/entities/request/register-dto";
import { AuthResponse } from "@/entities/request/auth-response";
import { LoginDTO } from "@/entities/request/login-dto";
import { ApiResponseWithErrors } from "@/entities/response/api-response";

@injectable()
export class AuthService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.JWTService) private jwtService: JWTService
  ) { }

  async register(data: RegisterDTO): Promise<ApiResponseWithErrors<AuthResponse>> {
    let response: ApiResponseWithErrors<AuthResponse> = {
      success: false,
      message: "",
      data: null,
      totalResults: 0,
      Error: [],
    };

    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      response.message = "El correo electrónico ya está en uso";
      return response;
    }

    // Crear usuario
    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: data.password,
      rolId: 2, // Asignar rol por defecto
    });

    const userAuthorizationsResponse = await this.userRepository.getUserAuthorizations(user.id);

    if (!userAuthorizationsResponse.success) {
      response.message = "No se pudieron obtener las autorizaciones del usuario";
      return response;
    }
    const authorizations = userAuthorizationsResponse.data!.operations.map(op => op.operations.map(o => o.guid)).flat();
    // Generar token
    const token = this.jwtService.generateToken({
      userId: user.id,
      email: user.email,
      role: user.rolId.toString(),
      operations: authorizations,
    });

    userAuthorizationsResponse.data!.token = token;

    response = {
      success: true,
      message: "Usuario registrado exitosamente",
      data: userAuthorizationsResponse.data!,
      totalResults: 1,
      Error: [],
    };

    return response;
  }

  async login(data: LoginDTO): Promise<ApiResponseWithErrors<AuthResponse>> {
    let response: ApiResponseWithErrors<AuthResponse> = {
      success: false,
      message: "",
      data: null,
      totalResults: 0,
      Error: [],
    };

    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      response.message = "Credenciales inválidas";
      return response;
    }

    // Verificar password
    const isPasswordValid = await user.comparePassword(data.password);
    if (!isPasswordValid) {
      response.message = "Credenciales inválidas";
      return response;
    }

    const userAuthorizationsResponse = await this.userRepository.getUserAuthorizations(user.id);

    if (!userAuthorizationsResponse.success) {
      response.message = "No se pudieron obtener las autorizaciones del usuario";
      return response;
    }

    // Generar token
    const token = this.jwtService.generateToken({
      userId: user.id,
      email: user.email,
      role: user.rolId.toString(),
      operations: userAuthorizationsResponse.data!.operations.map(op => op.operations.map(o => o.guid)).flat(),
    });

    userAuthorizationsResponse.data!.token = token;

    response = {
      success: true,
      message: "Usuario autenticado exitosamente",
      data: userAuthorizationsResponse.data!,
      totalResults: 1,
      Error: [],
    };

    return response;
  }

  async validateToken(token: string): Promise<User | null> {
    try {
      const payload = this.jwtService.verifyToken(token);
      const user = await this.userRepository.findById(payload.userId);
      return user;
    } catch (error) {
      return null;
    }
  }
}