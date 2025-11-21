import { TYPES } from "@/config/container-types";
import { DocumentStatus } from "@/entities/models/document-status";
import { ApiResponse } from "@/entities/response/api-response";
import { QueryParamsRequest } from "@/types/types/types.common";
import { FilterTranslator } from "@/utils/filter-translator";
import { RelationLoader } from "@/utils/relation-loader";
import { inject, injectable } from "inversify";
import { DataSource } from "typeorm/data-source/DataSource";
import { Repository } from "typeorm/repository/Repository";

@injectable()
export class DocumentStatusRepository {
    private repository: Repository<DocumentStatus>;

    constructor(
        @inject(TYPES.DataSource) private dataSource: DataSource,
        @inject(TYPES.FilterTranslator) private filterTranslator: FilterTranslator,
        @inject(TYPES.RelationLoader) private relationLoader: RelationLoader,
    ) {
        this.repository = this.dataSource.getRepository(DocumentStatus);
    }

    async findAll({filters, relations, pageNumber = 1, pageSize = 10, includeTotal = false} : QueryParamsRequest): Promise<ApiResponse<DocumentStatus[]>> {
       const qb = this.repository.createQueryBuilder("documentStatus");
        this.filterTranslator.applyFilter(qb, "documentStatus", filters);
        this.relationLoader.applyRelations(qb, "documentStatus", relations);

        qb.orderBy("documentStatus.id", "DESC");

        const skip = (pageNumber - 1) * pageSize;
        const pagedData = await qb.skip(skip).take(pageSize).getMany();

        if (includeTotal) {
            const [result, total] = await qb.getManyAndCount();
            // You can return total count along with results if needed
            return {
                data: result,
                totalResults: total,
                message: "Expedients retrieved successfully",
                success: true,
            }
        }

        return {
            data: pagedData,
            message: "Expedients retrieved successfully",
            success: true,
            totalResults: skip + pagedData.length + (pagedData.length > pageSize ? 1 : 0), // Approximate total
        };
    }
}