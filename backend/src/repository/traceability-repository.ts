import { TYPES } from "@/config/container-types";
import { Traceability } from "@/entities/models/traceability";
import { inject } from "inversify";
import { DataSource, Repository } from "typeorm";


export class TraceabilityRepository {
    private traceabilityRepository: Repository<Traceability>;

    constructor(
        @inject(TYPES.DataSource) private dbClient: DataSource
    ) {
        this.traceabilityRepository = this.dbClient.getRepository(Traceability);
    }

    async create(traceabilityData: Traceability): Promise<Traceability> {
        const traceability = this.traceabilityRepository.create(traceabilityData);
        return await this.traceabilityRepository.save(traceability);
    }

    async inactivateTraces(expedientId: number): Promise<boolean> {
        const updates = await this.traceabilityRepository.update({ expedientId: expedientId }, { state: false, updatedAt: new Date() });

        return updates.affected !== undefined && updates.affected > 0;
    }
}