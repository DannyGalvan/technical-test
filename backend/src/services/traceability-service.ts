import { TYPES } from "@/config/container-types";
import { AutomapperConfig } from "@/config/mapper-config";
import { ApiResponseWithErrors } from "@/entities/response/api-response";
import { TraceabilityResponse } from "@/entities/response/traceability-response";
import { TraceabilityRepository } from "@/repository/traceability-repository";
import { QueryParamsRequest } from "@/types/types/types.common";
import { inject, injectable } from "inversify";


@injectable()
export class TraceabilityService {
    constructor(
         @inject(TYPES.TraceabilityRepository) private traceabilityRepository: TraceabilityRepository,
        @inject(TYPES.Mapper) private mapper: AutomapperConfig,
    ) {}

     async getAll({filters, relations, pageNumber = 1, pageSize = 10, includeTotal = false} : QueryParamsRequest): Promise<ApiResponseWithErrors<TraceabilityResponse[]>> {
        const traceabilities = await this.traceabilityRepository.findAll({filters, relations, pageNumber, pageSize, includeTotal});

        return {
          data: traceabilities.data.map(traceability => this.mapper.Map(traceability, "TraceabilityToResponse")),
          message: 'Usuarios obtenidos exitosamente',
          success: traceabilities.success,
          totalResults: traceabilities.totalResults,
          Error: [],
        }
      }
}