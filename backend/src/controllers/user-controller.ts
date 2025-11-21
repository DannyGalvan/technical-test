import { TYPES } from "@/config/container-types";
import { UserRequest } from "@/entities/request/user-request";
import { ApiResponse } from "@/entities/response/api-response";
import { UserResponse } from "@/entities/response/user-response";
import { AuthMiddleware } from "@/middleware/auth-middleware";
import { UserService } from "@/services/user-service";
import { injectable, inject } from "inversify";
import {
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
  Put,
  QueryParam,
  UseBefore,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { CurrentUser } from "@/decorators/authorize";
import { OperationMiddleware } from "@/middleware/operation-middleware";
import { JWTPayload } from "@/services/jwt-service";
import { ErrorApi } from "@/entities/response/error-response";

@JsonController('/api/users')
@injectable()
@UseBefore(AuthMiddleware)
export class UserController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService
  ) { }

  @Get('/')
  @OpenAPI({
    summary: 'Obtener todos los usuarios',
    description: 'Retorna una lista de todos los usuarios registrados',
    tags: ['Users'],
  })
  @UseBefore(OperationMiddleware("user.view"))
    async getAll(   
                    @QueryParam("filters") filters?: string,
                    @QueryParam("relations") relations?: string,
                    @QueryParam("pageNumber") pageNumber?: number,
                    @QueryParam("pageSize") pageSize?: number,
                    @QueryParam("includeTotal") includeTotal?: boolean
                )
  {
    const users = await this.userService.getAllUsers({filters, relations, pageNumber, pageSize, includeTotal});

    if (!users.success) {
      const error: ApiResponse<ErrorApi[]> = {
        success: false,
        message: users.message,
        data: users.Error,
        totalResults: 0,
      };

      return error;
    }

    const success: ApiResponse<UserResponse[] | null> = {
      success: true,
      message: users.message,
      data: users.data,
      totalResults: users.totalResults,
    };

    return success;
  }

  @Get('/:id')
  @OpenAPI({
    summary: 'Obtener un usuario por ID',
    description: 'Retorna un usuario registrado por su ID',
    tags: ['Users'],
  })
  @UseBefore(OperationMiddleware("user.view"))
  async getById(@Param("id") id: number) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      const error: ApiResponse<ErrorApi[]> = {
        success: false,
        message: 'Usuario no encontrado',
        data: [{ code: 'invalid_element', message: "Usuario no encontrado", path: "" }],
        totalResults: 0,
      };
      return error;
    }

    const success: ApiResponse<UserResponse | null> = {
      success: true,
      message: user.message,
      data: user.data,
      totalResults: user.totalResults,
    };

    return success;
  }

  @Post('/')
  @OpenAPI({
    summary: 'Crear un nuevo usuario',
    description: 'Permite crear un nuevo usuario en el sistema',
    tags: ['Users'],
  })
  @UseBefore(OperationMiddleware("user.create"))
  async create(@Body() userData: UserRequest, @CurrentUser() user: JWTPayload) {
    userData.createdBy = user.userId;
    const createdUser = await this.userService.createUser(userData);

    if (!createdUser.success) {
      const error: ApiResponse<ErrorApi[]> = {
        success: false,
        message: createdUser.message,
        data: createdUser.Error,
        totalResults: 0,
      };

      return error;
    }

    const success: ApiResponse<UserResponse | null> = {
      success: true,
      message: createdUser.message,
      data: createdUser.data,
      totalResults: createdUser.totalResults,
    };

    return success;
  }

  @Put('/:id')
  @OpenAPI({
    summary: 'Actualizar un usuario existente',
    description: 'Permite actualizar los datos de un usuario registrado',
    tags: ['Users'],
  })
  @UseBefore(OperationMiddleware("user.edit"))
  async update(@Param("id") id: number, @Body() userData: UserRequest, @CurrentUser() user: JWTPayload) {
    userData.updatedBy = user.userId;
    const userExist = await this.userService.updateUser(id, userData);

    if (!userExist.success) {
      const error: ApiResponse<ErrorApi[]> = {
        success: false,
        message: userExist.message,
        data: userExist.Error,
        totalResults: 0,
      };
      return error;
    }

    const success: ApiResponse<UserResponse | null> = {
      success: true,
      message: userExist.message,
      data: userExist.data,
      totalResults: userExist.totalResults,
    };

    return success;
  }

  @Delete('/:id')
  @HttpCode(204)
  @OpenAPI({
    summary: 'Eliminar un usuario',
    description: 'Permite eliminar un usuario registrado del sistema',
    tags: ['Users'],
  })
  @UseBefore(OperationMiddleware("user.delete"))
  async delete(@Param("id") id: number) {
    const deleted = await this.userService.deleteUser(id);

    if (!deleted.success) {
      const error: ApiResponse<ErrorApi[]> = {
        success: false,
        message: deleted.message,
        data: deleted.Error,
        totalResults: 0,
      };
      return error;
    }

    const success: ApiResponse<UserResponse | null> = {
      success: true,
      message: deleted.message,
      data: deleted.data,
      totalResults: 0,
    };

    return success;
  }

  @Get('/profile/me')
  @OpenAPI({
    summary: 'Obtener el perfil del usuario actual',
    description: 'Retorna la información del perfil del usuario autenticado',
    tags: ['Users'],
  })
  @UseBefore(OperationMiddleware("user.view"))
  async getProfile(@CurrentUser() user: JWTPayload) {
    const userProfile = await this.userService.getUserById(user.userId);

    if (!userProfile.success) {
      const error: ApiResponse<ErrorApi[]> = {
        success: false,
        message: userProfile.message,
        data: userProfile.Error,
        totalResults: 0,
      };
      return error;
    }

    const success: ApiResponse<UserResponse | null> = {
      success: true,
      message: userProfile.message,
      data: userProfile.data,
      totalResults: userProfile.totalResults,
    };

    return success;
  }
}