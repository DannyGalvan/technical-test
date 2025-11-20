import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Operation } from "./operation";
import { IsBoolean, IsNumber, IsString } from "class-validator";

@Entity('modules')
export class Module {
    @IsNumber()
    @PrimaryGeneratedColumn('increment')
    id: number;
    @IsString()
    @Column({ type: 'varchar', length: 100 })
    name: string;
    @IsString()
    @Column({ type: 'text' })
    description: string;
    @IsString()
    @Column({ type: 'varchar', length: 255 })
    image: string;
    @IsString()
    @Column({ type: 'varchar', length: 255 })
    path: string;
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

    @OneToMany(() => Operation, operation => operation.module)
    operations?: Operation[];
}