import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from "./rol";
import { Operation } from "./operation";


@Entity('rol_operations')
export class RolOperation {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ type: 'int' })
    rolId: number;
    @Column({ type: 'int' })
    operationId: number;
    @Column({ type: 'bit' })
    state: boolean;
    @Column({ type: 'datetime2' })
    createdAt: Date;
    @Column({ type: 'datetime2', nullable: true })
    updatedAt?: Date;
    @Column({ type: 'int' })
    createdBy: number;
    @Column({ type: 'int', nullable: true })
    updatedBy?: number;

    @ManyToOne(() => Rol, rol => rol.rolOperations)
    @JoinColumn({ name: 'rolId' })
    rol?: Rol;
    @ManyToOne(() => Operation, operation => operation.rolOperations)
    @JoinColumn({ name: 'operationId' })
    operation?: Operation;
}