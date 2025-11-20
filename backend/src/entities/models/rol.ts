import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { RolOperation } from "./rol-operation";

@Entity()
export class Rol {
    @PrimaryGeneratedColumn('increment')
    id!: number;
    @Column("varchar", { length: 100 })
    name!: string;
    @Column("varchar", { length: 255 })
    description!: string;
    @Column("bit")
    state!: boolean;
    @Column("datetime2")
    createdAt!: Date;
    @Column("datetime2", { nullable: true })
    updatedAt?: Date;
    @Column()
    createdBy!: number;
    @Column({ nullable: true })
    updatedBy?: number;

    //relations
    @OneToMany(() => User, (user) => user.rol)
    users?: User[];
    @OneToMany(() => RolOperation, (rolOperation) => rolOperation.rol)
    rolOperations?: RolOperation[];
}