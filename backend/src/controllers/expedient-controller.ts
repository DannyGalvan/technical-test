import { TYPES } from "@/config/container-types";
import { CurrentUser } from "@/decorators/authorize";
import { ExpedientRequest } from "@/entities/request/expedient-request";
import { ApiResponse } from "@/entities/response/api-response";
import { ErrorApi } from "@/entities/response/error-response";
import { ExpedientResponse } from "@/entities/response/expedient-response";
import { AuthMiddleware } from "@/middleware/auth-middleware";
import { OperationMiddleware } from "@/middleware/operation-middleware";
import { ExpedientService } from "@/services/expedient-service";
import { JWTPayload } from "@/services/jwt-service";
import { inject, injectable } from "inversify";
import { Body, Get, JsonController, Param, Post, QueryParam, UseBefore } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

@JsonController('/api/evidences')
@injectable()
@UseBefore(AuthMiddleware)
export class ExpedientController {

    constructor(
        @inject(TYPES.ExpedientService) private expedientService: ExpedientService,
    ) { }

    @Get('/')
    @OpenAPI({
        summary: 'Obtener todos los expedientes',
        description: 'Retorna una lista de todos los expedientes registrados',
        tags: ['Expedients'],
    })
    @UseBefore(OperationMiddleware("evidence.view"))
    async getAll(@QueryParam("filters") filters: string, @QueryParam("relations") relations: string) {
        const expedients = await this.expedientService.getAllExpedients(filters, relations);

        if (!expedients.success) {
            const error: ApiResponse<ErrorApi[]> = {
                success: false,
                message: expedients.message,
                data: expedients.Error,
                totalResults: 0,
            };

            return error;
        }

        const success: ApiResponse<ExpedientResponse[] | null> = {
            success: true,
            message: expedients.message,
            data: expedients.data,
            totalResults: expedients.totalResults,
        };

        return success;
    }

    @Get('/:id')
    @OpenAPI({
        summary: 'Obtener un expediente por ID',
        description: 'Retorna un expediente registrado por su ID',
        tags: ['Expedients'],
    })
    @UseBefore(OperationMiddleware("evidence.view"))
    async getById(@Param("id") id: number, @QueryParam("relations") relations: string) {
        const expedient = await this.expedientService.getExpedientById(id, relations);

        if (!expedient.success) {
            const error: ApiResponse<ErrorApi[]> = {
                success: false,
                message: 'expediente no encontrado',
                data: [{ code: 'invalid_element', message: "Expediente no encontrado", path: "" }],
                totalResults: 0,
            };
            return error;
        }

        const success: ApiResponse<ExpedientResponse | null> = {
            success: true,
            message: expedient.message,
            data: expedient.data,
            totalResults: expedient.totalResults,
        };

        return success;
    }


    @Post('/')
    @OpenAPI({
        summary: 'Crear un nuevo expediente',
        description: 'Permite crear un nuevo expediente en el sistema',
        tags: ['Expedients'],
    })
    @UseBefore(OperationMiddleware("evidence.create"))
    async create(@Body() expedientData: ExpedientRequest, @CurrentUser() user: JWTPayload) {
        expedientData.userId = user.userId;
        const createdExpedient = await this.expedientService.createExpedient(expedientData);

        if (!createdExpedient.success) {
            const error: ApiResponse<ErrorApi[]> = {
                success: false,
                message: createdExpedient.message,
                data: createdExpedient.Error,
                totalResults: 0,
            };

            return error;
        }

        const success: ApiResponse<ExpedientResponse | null> = {
            success: true,
            message: createdExpedient.message,
            data: createdExpedient.data,
            totalResults: createdExpedient.totalResults,
        };

        return success;
    }
}