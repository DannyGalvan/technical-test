import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ExpedientItem } from "./expedient-item";
import { User } from "./user";

@Entity('expedients')
export class Expedient {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('int')
    userId: number;
    @Column('int', { nullable: true })
    authorizeUserId?: number;
    @Column('varchar', { length: 200 })
    description: string;
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
    @JoinColumn({ name: "authorizeUserId" })
    authorizedUser?: User;
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "userId" })
    user?: User;
    @OneToMany(() => ExpedientItem, (expedientItem) => expedientItem.expedient)
    expedientItems?: ExpedientItem[];
}