import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolOperation } from "./rol-operation";
import { Module } from "./module";
import { IsBoolean, IsNumber, IsString } from "class-validator";

@Entity('operations')
export class Operation {
    @IsNumber()
    @PrimaryGeneratedColumn('increment')
    id: number;
    @IsString()
    @Column({ type: 'varchar', length: 36 })
    guid: string;
    @IsString()
    @Column({ type: 'varchar', length: 100 })
    name: string;
    @IsString()
    @Column({ type: 'text' })
    description: string;
    @IsString()
    @Column({ type: 'varchar', length: 255 })
    policy: string;
    @IsString()
    @Column({ type: 'varchar', length: 100 })
    icon: string;
    @IsString()
    @Column({ type: 'varchar', length: 255 })
    path: string;
    @IsNumber()
    @Column({ type: 'int' })
    moduleId: number;
    @IsNumber()
    @Column({ type: 'bit' })
    @IsBoolean()
    isVisible: boolean;
    @IsBoolean()
    @Column({ type: 'bit' })
    state: boolean;
    @IsString()
    @Column({ type: 'datetime2' })
    createdAt: Date;
    @IsString()
    @Column({ type: 'datetime2', nullable: true })
    updatedAt?: Date;
    @IsNumber()
    @Column({ type: 'int' })
    createdBy: number;
    @IsNumber()
    @Column({ type: 'int', nullable: true })
    updatedBy?: number;

    @ManyToOne(() => Module, module => module.id)
    @JoinColumn({ name: 'moduleId' })
    module?: Module;
    @OneToMany(() => RolOperation, rolOperation => rolOperation.operation)
    rolOperations?: RolOperation[];
}