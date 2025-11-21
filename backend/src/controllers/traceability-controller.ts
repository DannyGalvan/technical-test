import { TYPES } from "@/config/container-types";
import { ApiResponse } from "@/entities/response/api-response";
import { ErrorApi } from "@/entities/response/error-response";
import { TraceabilityResponse } from "@/entities/response/traceability-response";
import { AuthMiddleware } from "@/middleware/auth-middleware";
import { OperationMiddleware } from "@/middleware/operation-middleware";
import { TraceabilityService } from "@/services/traceability-service";
import { inject, injectable } from "inversify";
import { Get, JsonController, QueryParam, UseBefore } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi/build/decorators";

@JsonController('/api/traceability')
@injectable()
@UseBefore(AuthMiddleware)
export class TraceabilityController {

    constructor(
        @inject(TYPES.TraceabilityService) private traceabilityService: TraceabilityService
    ) { }

    @Get('')
    @OpenAPI({
        summary: 'Obtener todas las trazabilidades',
        description: 'Retorna una lista de todas las trazabilidades registradas',
        tags: ['Traceabilities'],
    })
    @UseBefore(OperationMiddleware("evidence.view"))
    async getAll(
        @QueryParam("filters") filters?: string,
        @QueryParam("relations") relations?: string,
        @QueryParam("pageNumber") pageNumber?: number,
        @QueryParam("pageSize") pageSize?: number,
        @QueryParam("includeTotal") includeTotal?: boolean
    ) {
        const traceabilities = await this.traceabilityService.getAll({ filters, relations, pageNumber, pageSize, includeTotal });

        if (!traceabilities.success) {
            const error: ApiResponse<ErrorApi[]> = {
                success: false,
                message: traceabilities.message,
                data: traceabilities.Error,
                totalResults: 0,
            };

            return error;
        }

        const success: ApiResponse<TraceabilityResponse[] | null> = {
            success: true,
            message: traceabilities.message,
            data: traceabilities.data,
            totalResults: traceabilities.totalResults,
        };

        return success;
    }
}
