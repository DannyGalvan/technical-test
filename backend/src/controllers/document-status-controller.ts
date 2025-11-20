import { TYPES } from "@/config/container-types";
import { ApiResponse } from "@/entities/response/api-response";
import { ErrorApi } from "@/entities/response/error-response";
import { UserResponse } from "@/entities/response/user-response";
import { AuthMiddleware } from "@/middleware/auth-middleware";
import { DocumentStatusService } from "@/services/document-status-service";
import { inject, injectable } from "inversify";
import { Get, JsonController, QueryParam, UseBefore } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

@JsonController('/api/document-statuses')
@injectable()
@UseBefore(AuthMiddleware)
export class DocumentStatusController {

    constructor(
        @inject(TYPES.DocumentStatusService) private documentStatusService: DocumentStatusService
    ) { }

    @Get('/')
    @OpenAPI({
        summary: 'Obtener todos los estados de documento',
        description: 'Retorna una lista de todos los estados de documento registrados',
        tags: ['DocumentStatuses'],
    })
    async getAll(@QueryParam("filters") filters: string, @QueryParam("relations") relations: string) {
        const documentStatuses = await this.documentStatusService.getAllDocumentStatuses(filters, relations);

        if (!documentStatuses.success) {
            const error: ApiResponse<ErrorApi[]> = {
                success: false,
                message: documentStatuses.message,
                data: documentStatuses.Error,
                totalResults: 0,
            };

            return error;
        }

        const success: ApiResponse<UserResponse[] | null> = {
            success: true,
            message: documentStatuses.message,
            data: documentStatuses.data,
            totalResults: documentStatuses.totalResults,
        };

        return success;
    }
}