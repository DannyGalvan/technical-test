import { TYPES } from "@/config/container-types";
import { AutomapperConfig } from "@/config/mapper-config";
import { DocumentStatus } from "@/entities/models/document-status";
import { ApiResponseWithErrors } from "@/entities/response/api-response";
import { DocumentStatusResponse } from "@/entities/response/document-status-response";
import { DocumentStatusRepository } from "@/repository/document-status-repository";
import { QueryParamsRequest } from "@/types/types/types.common";
import { inject, injectable } from "inversify";

@injectable()
export class DocumentStatusService {
    constructor(
        @inject(TYPES.DocumentStatusRepository) private documentStatusRepository: DocumentStatusRepository,
        @inject(TYPES.Mapper) private mapper: AutomapperConfig,
    ) { }

    async getAllDocumentStatuses({filters, relations, pageNumber = 1, pageSize = 10, includeTotal = false} : QueryParamsRequest): Promise<ApiResponseWithErrors<DocumentStatusResponse[]>> {
        const documentStatuses = await this.documentStatusRepository.findAll({filters, relations, pageNumber, pageSize, includeTotal});
        return {
            data: documentStatuses.data.map(ds => this.mapper.Map<DocumentStatus, DocumentStatusResponse>(ds, "DocumentStatusToResponse")),
            message: 'Estados de documento obtenidos exitosamente',
            success: documentStatuses.success,
            totalResults: documentStatuses.totalResults,
            Error: [],
        }
    }
}