import { TYPES } from "@/config/container-types";
import { ApiResponse } from "@/entities/response/api-response";
import { AuthMiddleware } from "@/middleware/auth-middleware";
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
import { RolService } from "@/services/rol-service";
import { RolResponse } from "@/entities/response/rol-response";
import { RolRequest } from "@/entities/request/rol-request";

@JsonController('/api/roles')
@injectable()
@UseBefore(AuthMiddleware)
export class RolController {
  constructor(
    @inject(TYPES.RolService) private rolService: RolService
  ) { }

  @Get('/')
  @OpenAPI({
    summary: 'Obtener todos los roles',
    description: 'Retorna una lista de todos los roles registrados',
    tags: ['Roles'],
  })
  @UseBefore(OperationMiddleware("rol.view"))
    async getAll(   
                    @QueryParam("filters") filters?: string,
                    @QueryParam("relations") relations?: string,
                    @QueryParam("pageNumber") pageNumber?: number,
                    @QueryParam("pageSize") pageSize?: number,
                    @QueryParam("includeTotal") includeTotal?: boolean
                )
  {
    const roles = await this.rolService.getAll({filters, relations, pageNumber, pageSize, includeTotal});

    if (!roles.success) {
      const error: ApiResponse<ErrorApi[]> = {
        success: false,
        message: roles.message,
        data: roles.Error,
        totalResults: 0,
      };

      return error;
    }

    const success: ApiResponse<RolResponse[] | null> = {
      success: true,
      message: roles.message,
      data: roles.data,
      totalResults: roles.totalResults,
    };

    return success;
  }

  @Get('/:id')
  @OpenAPI({
    summary: 'Obtener un rol por ID',
    description: 'Retorna un rol registrado por su ID',
    tags: ['Roles'],
  })
  @UseBefore(OperationMiddleware("rol.view"))
  async getById(@Param("id") id: number, @QueryParam("relations") relations?: string) {
    const rol = await this.rolService.getById(id, relations || "");

    if (!rol) {
      const error: ApiResponse<ErrorApi[]> = {
        success: false,
        message: 'Rol no encontrado',
        data: [{ code: 'invalid_element', message: "Rol no encontrado", path: "" }],
        totalResults: 0,
      };
      return error;
    }

    const success: ApiResponse<RolResponse | null> = {
      success: true,
      message: rol.message,
      data: rol.data,
      totalResults: rol.totalResults,
    };

    return success;
  }

  @Post('/')
  @OpenAPI({
    summary: 'Crear un nuevo rol',
    description: 'Permite crear un nuevo rol en el sistema',
    tags: ['Roles'],
  })
  @UseBefore(OperationMiddleware("rol.create"))
  async create(@Body() rolData: RolRequest, @CurrentUser() user: JWTPayload) {
    rolData.createdBy = user.userId;
    const createdRol = await this.rolService.createRol(rolData);

    if (!createdRol.success) {
      const error: ApiResponse<ErrorApi[]> = {
        success: false,
        message: createdRol.message,
        data: createdRol.Error,
        totalResults: 0,
      };

      return error;
    }

    const success: ApiResponse<RolResponse | null> = {
      success: true,
      message: createdRol.message,
      data: createdRol.data,
      totalResults: createdRol.totalResults,
    };

    return success;
  }

  @Put('/:id')
  @OpenAPI({
    summary: 'Actualizar un rol existente',
    description: 'Permite actualizar los datos de un rol registrado',
    tags: ['Roles'],
  })
  @UseBefore(OperationMiddleware("rol.edit"))
  async update(@Param("id") id: number, @Body() rolData: RolRequest, @CurrentUser() user: JWTPayload) {
    rolData.updatedBy = user.userId;
    const rolExist = await this.rolService.updateRol(id, rolData);

    if (!rolExist.success) {
      const error: ApiResponse<ErrorApi[]> = {
        success: false,
        message: rolExist.message,
        data: rolExist.Error,
        totalResults: 0,
      };
      return error;
    }

    const success: ApiResponse<RolResponse | null> = {
      success: true,
      message: rolExist.message,
      data: rolExist.data,
      totalResults: rolExist.totalResults,
    };

    return success;
  }

  @Delete('/:id')
  @HttpCode(204)
  @OpenAPI({
    summary: 'Eliminar un rol',
    description: 'Permite eliminar un rol registrado del sistema',
    tags: ['Roles'],
  })
  @UseBefore(OperationMiddleware("rol.delete"))
  async delete(@Param("id") id: number) {
    const deleted = await this.rolService.deleteRol(id);

    if (!deleted.success) {
      const error: ApiResponse<ErrorApi[]> = {
        success: false,
        message: deleted.message,
        data: deleted.Error,
        totalResults: 0,
      };
      return error;
    }

    const success: ApiResponse<RolResponse | null> = {
      success: true,
      message: deleted.message,
      data: deleted.data,
      totalResults: 0,
    };

    return success;
  }
}