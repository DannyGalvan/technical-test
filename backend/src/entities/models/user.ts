import bcrypt from "bcryptjs";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from "./rol";


@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    rolId: number;
    @Column("varchar", { length: 100 })
    name: string;
    @Column("varchar", { length: 100 })
    email: string;
    @Column("varchar", { length: 100 })
    password: string;
    @Column("bit")
    state: boolean;
    @Column("datetime2")
    createdAt: Date;
    @Column("datetime2", { nullable: true })
    updatedAt?: Date;
    @Column()
    createdBy: number;
    @Column({ nullable: true })
    updatedBy?: number;

    // Relations
    @ManyToOne(() => Rol, (rol) => rol.users)
    @JoinColumn({ name: "rolId" })
    rol?: Rol;

    // Hash password antes de insertar
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password && !this.password.startsWith('$2')) {
            this.salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, this.salt);
        }
    }

    // Método para comparar password
    async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }

    @Column({ nullable: true })
    salt?: string;
}