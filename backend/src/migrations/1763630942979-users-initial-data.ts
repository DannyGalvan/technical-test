import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersInitialData1763630942979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "rol" (name, description, state, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES 
        ('Admin', 'Administrator role with full permissions', 1, GETDATE(), GETDATE(), 1, NULL),
        ('User', 'Standard user role with limited permissions', 1, GETDATE(), GETDATE(), 1, NULL);`);

        await queryRunner.query(`INSERT INTO "user" ("rolId", name, email, password, state, "createdAt", "updatedAt", "createdBy", "updatedBy", salt) VALUES 
        (1, 'Admin User', 'admin@example.com', '$2a$12$zLVMne5MjmqP3v.VS0nac.4KHT1dhW.2bHrdFj.KyLgBhTHt9zPiG', 1, GETDATE(), GETDATE(), 1, NULL, '$2b$10$pQkm7NwN8Vliov9uRYkM7O'),
        (2, 'Regular User', 'user@example.com', '$2a$12$261q/7Hc//szyFX9GNiNW.IuRm/Pqzd6sFQmkuu7JFS3zLmhWPYh2', 1, GETDATE(), GETDATE(), 1, NULL, '$2b$10$NYJ6zaHkLUG7wusHeUm1UO');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "user" WHERE email IN ('admin@example.com', 'user@example.com');`);
        await queryRunner.query(`DELETE FROM "rol" WHERE name IN ('Admin', 'User');`);
    }

}
