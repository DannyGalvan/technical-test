import { MigrationInterface, QueryRunner } from "typeorm";

export class DocumentStatusData1763637080775 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO [document-statuses] (name, state, createdAt, updatedAt, createdBy, updatedBy) VALUES
        ('Pendiente', '1', GETDATE(), NULL, 1, NULL),
        ('Aprobado', '1', GETDATE(), NULL, 1, NULL),
        ('Rechazado', '1', GETDATE(), NULL, 1, NULL);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM [document-statuses] WHERE name IN ('Pendiente', 'Aprobado', 'Rechazado');`);
    }
}
