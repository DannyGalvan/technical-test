import { TYPES } from "@/config/container-types";
import { Rol } from "@/entities/models/rol";
import { ApiResponse } from "@/entities/response/api-response";
import { QueryParamsRequest } from "@/types/types/types.common";
import { FilterTranslator } from "@/utils/filter-translator";
import { RelationLoader } from "@/utils/relation-loader";
import { inject, injectable } from "inversify";
import { DataSource } from "typeorm/data-source/DataSource";
import { Repository } from "typeorm/repository/Repository";

@injectable()
export class RolRepository {
    private repository: Repository<Rol>;

    constructor(
        @inject(TYPES.DataSource) private dataSource: DataSource,
        @inject(TYPES.FilterTranslator) private filterTranslator: FilterTranslator,
        @inject(TYPES.RelationLoader) private relationLoader: RelationLoader,
    ) {
        this.repository = this.dataSource.getRepository(Rol);
        }

    async findAll({filters, relations, pageNumber = 1, pageSize = 10, includeTotal = false} : QueryParamsRequest): Promise<ApiResponse<Rol[]>> {
        const qb = this.repository.createQueryBuilder("rol");
        this.filterTranslator.applyFilter(qb, "rol", filters);
        this.relationLoader.applyRelations(qb, "rol", relations);
        qb.orderBy("rol.id", "DESC");

        const skip = (pageNumber - 1) * pageSize;
        const pagedData = await qb.skip(skip).take(pageSize).getMany();

        if (includeTotal) {
            const [result, total] = await qb.getManyAndCount();
            // You can return total count along with results if needed
            return {
                data: result,
                totalResults: total,
                message: "Rols retrieved successfully",
                success: true,
            }
        }

        return {
            data: pagedData,
            message: "Rols retrieved successfully",
            success: true,
            totalResults: skip + pagedData.length + (pagedData.length > pageSize ? 1 : 0), // Approximate total
        };
    }

    async findById(id: number, relations: string): Promise<Rol | null> {
        const qb = this.repository.createQueryBuilder("rol");
        qb.where("rol.id = :id", { id });
        this.relationLoader.applyRelations(qb, "rol", relations);
        return qb.getOne();
    }

    async save(rol: Rol): Promise<Rol> {
        const savedRol = await this.repository.save(rol);
        return savedRol;
    }

    async update(id: number, rol: Partial<Rol>): Promise<Rol | null> {
        rol.updatedAt = new Date();
        rol.id = undefined;
        rol.createdAt = undefined;
        rol.createdBy = undefined;
        await this.repository.update(id, rol);
        return this.repository.findOneByOrFail({ id });
    }

    async delete(id: number): Promise<Rol | null> {
        await this.repository.update(id, { state: false, updatedAt: new Date() });
        return this.repository.findOneByOrFail({ id });
    }
}