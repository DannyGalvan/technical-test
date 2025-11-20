import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expedient } from "./expedient";
import { User } from "./user";

@Entity('expedient-items')
export class ExpedientItem {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('int')
    expedientId: number;
    @Column('varchar', { length: 200 })
    description: string;
    @Column('varchar', { length: 100 })
    color: string;
    @Column('varchar', { length: 50 })
    size: string;
    @Column('decimal', { precision: 10, scale: 2 })
    weight: number;
    @Column('varchar', { length: 200 })
    location: string;
    @Column('int')
    userId: number;
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

    @ManyToOne(() => Expedient, (expedient) => expedient.expedientItems)
    @JoinColumn({ name: "expedientId" })
    expedient?: Expedient;
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "userId" })
    user?: User;
}