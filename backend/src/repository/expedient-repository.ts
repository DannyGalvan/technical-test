import { TYPES } from "@/config/container-types";
import { Expedient } from "@/entities/models/expedient";
import { ExpedientItem } from "@/entities/models/expedient-item";
import { FilterTranslator } from "@/utils/filter-translator";
import { RelationLoader } from "@/utils/relation-loader";
import { inject, injectable } from "inversify";
import { DataSource } from "typeorm/data-source/DataSource";
import { Repository } from "typeorm/repository/Repository";

@injectable()
export class ExpedientRepository {
    private repository: Repository<Expedient>;
    private items: Repository<ExpedientItem>;

    constructor(
        @inject(TYPES.DataSource) private dataSource: DataSource,
        @inject(TYPES.FilterTranslator) private filterTranslator: FilterTranslator,
        @inject(TYPES.RelationLoader) private relationLoader: RelationLoader,
    ) {
        this.repository = this.dataSource.getRepository(Expedient);
        this.items = this.dataSource.getRepository(ExpedientItem);
    }

    async findAll(filters: string, relations: string): Promise<Expedient[]> {
        const qb = this.repository.createQueryBuilder("expedient");
        this.filterTranslator.applyFilter(qb, "expedient", filters);
        this.relationLoader.applyRelations(qb, "expedient", relations);
        return qb.getMany();
    }

    async findById(id: number, relations: string): Promise<Expedient | null> {
        const qb = this.repository.createQueryBuilder("expedient");
        qb.where("expedient.id = :id", { id });
        this.relationLoader.applyRelations(qb, "expedient", relations);
        return qb.getOne();
    }

    async save(expedient: Expedient): Promise<Expedient> {
        const savedExpedient = await this.repository.save(expedient);

        for (const item of expedient.expedientItems!) {
            item.expedientId = savedExpedient.id;
            await this.items.save(item);
        }

        return savedExpedient;
    }

    async update(id: number, expedient: Expedient): Promise<Expedient | null> {
        expedient.updatedAt = new Date();
        await this.repository.update(id, { authorizeUserId: expedient.authorizeUserId, documentStatusId: expedient.documentStatusId, updatedAt: expedient.updatedAt, userId: expedient.userId });
        return this.repository.findOneByOrFail({ id });
    }

    async delete(id: number): Promise<Expedient | null> {
        await this.repository.update(id, { state: false, updatedAt: new Date() });
        return this.repository.findOneByOrFail({ id });
    }
}