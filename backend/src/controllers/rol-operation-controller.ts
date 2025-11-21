import { TYPES } from "@/config/container-types";
import { CurrentUser } from "@/decorators/authorize";
import { RolOperationRequest } from "@/entities/request/rol-operation-request";
import { ApiResponse } from "@/entities/response/api-response";
import { ErrorApi } from "@/entities/response/error-response";
import { OperationResponse } from "@/entities/response/operation-response";
import { RolOperationResponse } from "@/entities/response/rol-operation-response";
import { AuthMiddleware } from "@/middleware/auth-middleware";
import { JWTPayload } from "@/services/jwt-service";
import { RolOperationService } from "@/services/rol-operation-service";
import { inject, injectable } from "inversify";
import { Body, Get, JsonController, Param, Post, Put, QueryParam, UseBefore } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

@JsonController('/api/rol-operations')
@injectable()
@UseBefore(AuthMiddleware)
export class RolOperationController {

    constructor(
        @inject(TYPES.RolOperationService) private rolOperationService: RolOperationService
    ) { }

    @Get('')
    @OpenAPI({
        summary: 'Obtener todos los permisos de un rol',
        description: 'Retorna una lista de todos los permisos de un rol registrados',
        tags: ['RolOperations'],
    })
    async getAll(   
                    @QueryParam("filters") filters?: string,
                    @QueryParam("relations") relations?: string,
                    @QueryParam("pageNumber") pageNumber?: number,
                    @QueryParam("pageSize") pageSize?: number,
                    @QueryParam("includeTotal") includeTotal?: boolean
                )
    {
        const rolOperations = await this.rolOperationService.getAll({filters, relations, pageNumber, pageSize, includeTotal});

        if (!rolOperations.success) {
            const error: ApiResponse<ErrorApi[]> = {
                success: false,
                message: rolOperations.message,
                data: rolOperations.Error,
                totalResults: 0,
            };

            return error;
        }

        const success: ApiResponse<RolOperationResponse[] | null> = {
            success: true,
            message: rolOperations.message,
            data: rolOperations.data,
            totalResults: rolOperations.totalResults,
        };

        return success;
    }

    @Get('/operations')
    @OpenAPI({
        summary: 'Obtener todas las operaciones disponibles',
        description: 'Retorna todas las operaciones disponibles en el sistema',
        tags: ['RolOperations'],
    })
    async getAllOperations(   
                    @QueryParam("filters") filters?: string,
                    @QueryParam("relations") relations?: string,
                    @QueryParam("pageNumber") pageNumber?: number,
                    @QueryParam("pageSize") pageSize?: number,
                    @QueryParam("includeTotal") includeTotal?: boolean
                )
    {
        const rolOperations = await this.rolOperationService.getAllOperations({filters, relations, pageNumber, pageSize, includeTotal});

        if (!rolOperations.success) {
            const error: ApiResponse<ErrorApi[]> = {
                success: false,
                message: rolOperations.message,
                data: rolOperations.Error,
                totalResults: 0,
            };

            return error;
        }

        const success: ApiResponse<OperationResponse[] | null> = {
            success: true,
            message: rolOperations.message,
            data: rolOperations.data,
            totalResults: rolOperations.totalResults,
        };

        return success;
    }



    @Post('/')
    @OpenAPI({
        summary: 'Agregar un nuevo permiso a un rol',
        description: 'Permite crear un nuevo permiso a un rol en el sistema',
        tags: ['RolOperations'],
    })
    async create(@Body() rolOperationData: RolOperationRequest, @CurrentUser() user: JWTPayload) {
        rolOperationData.createdBy = user.userId;
        const createdRolOperation = await this.rolOperationService.create(rolOperationData);

        if (!createdRolOperation.success) {
            const error: ApiResponse<ErrorApi[]> = {
                success: false,
                message: createdRolOperation.message,
                data: createdRolOperation.Error,
                totalResults: 0,
            };

            return error;
        }

        const success: ApiResponse<RolOperationResponse | null> = {
            success: true,
            message: createdRolOperation.message,
            data: createdRolOperation.data,
            totalResults: createdRolOperation.totalResults,
        };

        return success;
    }

    @Put('/:id')
    @OpenAPI({
        summary: 'Actualizar un permiso de rol existente',
        description: 'Permite actualizar los datos de un permiso de rol existente',
        tags: ['RolOperations'],
    })
    async update(@Param("id") id: number, @Body() rolOperationData: RolOperationRequest, @CurrentUser() user: JWTPayload) {
        rolOperationData.updatedBy = user.userId;

        const updatedRolOperation = await this.rolOperationService.updateRolOperation(id, rolOperationData);

        if (!updatedRolOperation.success) {
            const error: ApiResponse<ErrorApi[]> = {
                success: false,
                message: updatedRolOperation.message,
                data: updatedRolOperation.Error,
                totalResults: 0,
            };
            return error;
        }

        const success: ApiResponse<RolOperationResponse | null> = {
            success: true,
            message: updatedRolOperation.message,
            data: updatedRolOperation.data,
            totalResults: updatedRolOperation.totalResults,
        };
        return success;
    }
}