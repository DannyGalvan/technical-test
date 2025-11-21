import { TYPES } from "@/config/container-types";
import { Operation } from "@/entities/models/operation";
import { RolOperation } from "@/entities/models/rol-operation";
import { ApiResponse } from "@/entities/response/api-response";
import { QueryParamsRequest } from "@/types/types/types.common";
import { FilterTranslator } from "@/utils/filter-translator";
import { RelationLoader } from "@/utils/relation-loader";
import { inject, injectable } from "inversify";
import { DataSource } from "typeorm/data-source/DataSource";
import { Repository } from "typeorm/repository/Repository";

@injectable()
export class RolOperationRepository {
    private repository: Repository<RolOperation>;
    private operations: Repository<Operation>;

    constructor(
        @inject(TYPES.DataSource) private dataSource: DataSource,
        @inject(TYPES.FilterTranslator) private filterTranslator: FilterTranslator,
        @inject(TYPES.RelationLoader) private relationLoader: RelationLoader,
    ) {
        this.repository = this.dataSource.getRepository(RolOperation);
        this.operations = this.dataSource.getRepository(Operation);
    }

    async findAll({filters, relations, pageNumber = 1, pageSize = 10, includeTotal = false} : QueryParamsRequest): Promise<ApiResponse<RolOperation[]>> {
        const qb = this.repository.createQueryBuilder("rol_operation");
        this.filterTranslator.applyFilter(qb, "rol_operation", filters);
        this.relationLoader.applyRelations(qb, "rol_operation", relations);

        qb.orderBy("rol_operation.id", "DESC");

        const skip = (pageNumber - 1) * pageSize;
        const pagedData = await qb.skip(skip).take(pageSize).getMany();

        if (includeTotal) {
            const [result, total] = await qb.getManyAndCount();
            // You can return total count along with results if needed
            return {
                data: result,
                totalResults: total,
                message: "RolOperations retrieved successfully",
                success: true,
            }
        }

        return {
            data: pagedData,
            message: "RolOperations retrieved successfully",
            success: true,
            totalResults: skip + pagedData.length + (pagedData.length > pageSize ? 1 : 0), // Approximate total
        };
    }

    async findAllOperations({filters, relations, pageNumber = 1, pageSize = 10, includeTotal = false} : QueryParamsRequest): Promise<ApiResponse<Operation[]>> {
        const qb = this.operations.createQueryBuilder("operation");
        this.filterTranslator.applyFilter(qb, "operation", filters);
        this.relationLoader.applyRelations(qb, "operation", relations);

        qb.orderBy("operation.id", "DESC");

        const skip = (pageNumber - 1) * pageSize;
        const pagedData = await qb.skip(skip).take(pageSize).getMany();

        if (includeTotal) {
            const [result, total] = await qb.getManyAndCount();
            // You can return total count along with results if needed
            return {
                data: result,
                totalResults: total,
                message: "Operations retrieved successfully",
                success: true,
            }
        }

        return {
            data: pagedData,
            message: "Operations retrieved successfully",
            success: true,
            totalResults: skip + pagedData.length + (pagedData.length > pageSize ? 1 : 0), // Approximate total
        };
    }

    async findById(id: number, relations: string): Promise<RolOperation | null> {
        const qb = this.repository.createQueryBuilder("rol_operation");
        qb.where("rol_operation.id = :id", { id });
        this.relationLoader.applyRelations(qb, "rol_operation", relations);
        return qb.getOne();
    }

    async save(rolOperation: RolOperation): Promise<RolOperation> {

        const existOperation = await this.repository.findOneBy({ rolId: rolOperation.rolId, operationId: rolOperation.operationId });

        if (existOperation) {

            const updateOperation = await this.update(existOperation.id, {
                state: 1,
                updatedBy: rolOperation.createdBy,
                updatedAt: new Date(),
            });

            return updateOperation!;
        }

        const savedRolOperation = await this.repository.save(rolOperation);

        return savedRolOperation;
    }

    async update(id: number, rolOperation: Partial<RolOperation>): Promise<RolOperation | null> {
        rolOperation.updatedAt = new Date();
        rolOperation.createdAt = undefined;
        rolOperation.createdBy = undefined;
        rolOperation.id = undefined;

        console.log('Updating RolOperation with ID:', id, 'with data:', rolOperation);

        await this.repository.update(id, rolOperation);
        return this.repository.findOneByOrFail({ id });
    }

    async delete(id: number): Promise<RolOperation | null> {
        await this.repository.update(id, { state: 0, updatedAt: new Date() });
        return this.repository.findOneByOrFail({ id });
    }
}