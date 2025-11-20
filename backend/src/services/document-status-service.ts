import { TYPES } from "@/config/container-types";
import { AutomapperConfig } from "@/config/mapper-config";
import { DocumentStatus } from "@/entities/models/document-status";
import { ApiResponseWithErrors } from "@/entities/response/api-response";
import { DocumentStatusResponse } from "@/entities/response/document-status-response";
import { DocumentStatusRepository } from "@/repository/document-status-repository";
import { inject, injectable } from "inversify";

@injectable()
export class DocumentStatusService {
    constructor(
        @inject(TYPES.DocumentStatusRepository) private documentStatusRepository: DocumentStatusRepository,
        @inject(TYPES.Mapper) private mapper: AutomapperConfig,
    ) { }

    async getAllDocumentStatuses(filters: string, relations: string): Promise<ApiResponseWithErrors<DocumentStatusResponse[]>> {
        const documentStatuses = await this.documentStatusRepository.findAll(filters, relations);
        return {
            data: documentStatuses.map(ds => this.mapper.Map<DocumentStatus, DocumentStatusResponse>(ds, "DocumentStatusToResponse")),
            message: 'Estados de documento obtenidos exitosamente',
            success: true,
            totalResults: documentStatuses.length,
            Error: [],
        }
    }
}