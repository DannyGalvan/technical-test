import { TYPES } from "@/config/container-types";
import { DocumentStatus } from "@/entities/models/document-status";
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

    async findAll(filters: string, relations: string): Promise<DocumentStatus[]> {
        const qb = this.repository.createQueryBuilder("documentStatus");
        this.filterTranslator.applyFilter(qb, "documentStatus", filters);
        this.relationLoader.applyRelations(qb, "documentStatus", relations);
        return qb.getMany();
    }
}