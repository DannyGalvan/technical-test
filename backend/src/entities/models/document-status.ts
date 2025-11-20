import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Traceability } from "./traceability";

@Entity('document-statuses')
export class DocumentStatus {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('varchar', { length: 100 })
    name: string;
    @Column("bit")
    state: boolean;
    @Column("datetime2")
    createdAt: Date;
    @Column("datetime2", { nullable: true })
    updatedAt?: Date;
    @Column('int')
    createdBy: number;
    @Column('int', { nullable: true })
    updatedBy?: number;

    @OneToMany(() => Traceability, (traceability) => traceability.documentStatus)
    traceabilities?: Traceability[];
}