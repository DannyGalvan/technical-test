import { TYPES } from "@/config/container-types";
import { Traceability } from "@/entities/models/traceability";
import { ApiResponse } from "@/entities/response/api-response";
import { QueryParamsRequest } from "@/types/types/types.common";
import { FilterTranslator } from "@/utils/filter-translator";
import { RelationLoader } from "@/utils/relation-loader";
import { inject } from "inversify";
import { DataSource, Repository } from "typeorm";


export class TraceabilityRepository {
    private repository: Repository<Traceability>;

    constructor(
        @inject(TYPES.DataSource) private dbClient: DataSource,
        @inject(TYPES.FilterTranslator) private filterTranslator: FilterTranslator,
        @inject(TYPES.RelationLoader) private relationLoader: RelationLoader,
    ) {
        this.repository = this.dbClient.getRepository(Traceability);
    }

    async findAll({filters, relations, pageNumber = 1, pageSize = 10, includeTotal = false} : QueryParamsRequest): Promise<ApiResponse<Traceability[]>> {
            const qb = this.repository.createQueryBuilder("traceability");
            this.filterTranslator.applyFilter(qb, "traceability", filters);
            this.relationLoader.applyRelations(qb, "traceability", relations);
    
            qb.orderBy("traceability.id", "DESC");
    
            const skip = (pageNumber - 1) * pageSize;
            const pagedData = await qb.skip(skip).take(pageSize).getMany();
    
            if (includeTotal) {
                const [result, total] = await qb.getManyAndCount();
                // You can return total count along with results if needed
                return {
                    data: result,
                    totalResults: total,
                    message: "Traceabilities retrieved successfully",
                    success: true,
                }
            }
    
            return {
                data: pagedData,
                message: "Traceabilities retrieved successfully",
                success: true,
                totalResults: skip + pagedData.length + (pagedData.length > pageSize ? 1 : 0), // Approximate total
            };
        }

    async create(traceabilityData: Traceability): Promise<Traceability> {
        const traceability = this.repository.create(traceabilityData);
        return await this.repository.save(traceability);
    }

    async inactivateTraces(expedientId: number): Promise<boolean> {
        const updates = await this.repository.update({ expedientId: expedientId }, { state: false, updatedAt: new Date() });

        return updates.affected !== undefined && updates.affected > 0;
    }
}