import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { DocumentStatus } from "./document-status";


@Entity('traceabilities')
export class Traceability {
    @PrimaryGeneratedColumn('increment')
    id?: number;
    @Column('int')
    expedientId: number;
    @Column('int')
    createdUserId: number;
    @Column('int', { nullable: true })
    authorizeUserId?: number;
    @Column('int')
    documentStatusId: number;
    @Column('varchar', { length: 200 })
    comments: string;
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

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "createdUserId" })
    createdUser?: User;
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "authorizeUserId" })
    authorizedUser?: User;
    @ManyToOne(() => DocumentStatus, (documentStatus) => documentStatus.id)
    @JoinColumn({ name: "documentStatusId" })
    documentStatus?: DocumentStatus;
}