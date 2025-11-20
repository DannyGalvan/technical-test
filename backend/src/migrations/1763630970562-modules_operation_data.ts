import { MigrationInterface, QueryRunner } from "typeorm";

export class ModulesOperationData1763630970562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "modules" (name, description, image, path, state, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES 
        ('Usuarios', 'Modulo para gestionar usuarios y roles', 'bi bi-people', '/users', 1, GETDATE(), NULL, 1, NULL),
        ('Evidencias', 'Modulo para gestionar evidencias', 'bi bi-box-seam', '/evidences', 1, GETDATE(), NULL, 1, NULL);`);

        await queryRunner.query(`INSERT INTO "operations" (guid, name, description, policy, icon, path, "moduleId", "isVisible", state, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES 
        ('bd587503-a33a-4ec2-b547-5b04ab38098c', 'Crear Usuario', 'Operacion para crear un nuevo usuario', 'user.create', 'bi bi-person-plus', '/users/create', 1, 1, 1, GETDATE(), NULL, 1, NULL),
        ('124efcec-ed1a-4904-8b37-b6263815ca74', 'Editar Usuario', 'Operacion para editar un usuario existente', 'user.edit', 'bi bi-pencil', '/users/edit/:id', 1, 0, 1, GETDATE(), NULL, 1, NULL),
        ('e69b9e7e-8030-48f6-b834-9b6e82746dfd', 'Eliminar Usuario', 'Operacion para eliminar un usuario', 'user.delete', 'bi bi-person-dash', '/users/delete/:id', 1, 0, 1, GETDATE(), NULL, 1, NULL),
        ('f2ab5f90-0380-4008-ab41-a3770374698b', 'Listar Usuarios', 'Operacion para listar usuarios', 'user.view', 'bi bi-people', '/users', 1, 1, 1, GETDATE(), NULL, 1, NULL),
        ('614dba09-2966-47b9-9a0c-2792dc9d303a', 'Crear Rol', 'Operacion para crear un nuevo rol', 'rol.create', 'bi bi-shield-lock', '/roles/create', 1, 1, 1, GETDATE(), NULL, 1, NULL),
        ('ae2d5459-9c8b-4c73-b679-8af3ae77a23e', 'Editar Rol', 'Operacion para editar un rol', 'rol.edit', 'bi bi-pencil', '/roles/edit/:id', 1, 0, 1, GETDATE(), NULL, 1, NULL),
        ('6009d576-f23c-480c-a650-8c00adfe38bd', 'Eliminar Rol', 'Operacion para eliminar un rol', 'rol.delete', 'bi bi-shield-lock-fill', '/roles/delete/:id', 1, 0, 1, GETDATE(), NULL, 1, NULL),
        ('e32718fb-316e-4105-8655-168bcf80a3e5', 'Listar Roles', 'Operacion para listar roles', 'rol.view', 'bi bi-shield-check', '/roles', 1, 1, 1, GETDATE(), NULL, 1, NULL),
        ('d1f5e8c4-3f4a-4f2e-9f4b-2e5e5f5e5f5e', 'Registrar Expendiente', 'Operacion para registrar un expediente', 'evidence.create', 'bi bi-upload', '/evidences/create', 2, 1, 1, GETDATE(), NULL, 1, NULL),
        ('a2b3c4d5-e6f7-8901-2345-67890abcdef1', 'Ver Expendientes', 'Operacion para ver expedientes', 'evidence.view', 'bi bi-folder-open', '/evidences', 2, 1, 1, GETDATE(), NULL, 1, NULL),
        ('b1c2d3e4-f5a6-7890-1234-56789abcdef0', 'Eliminar Expendiente', 'Operacion para eliminar un expediente', 'evidence.delete', 'bi bi-trash', '/evidences/delete/:id', 2, 0, 1, GETDATE(), NULL, 1, NULL),
        ('c1d2e3f4-a5b6-7890-1234-56789abcdef2', 'Authorizaciones Pendientes', 'Operacion para autorizar un expediente', 'evidence.authorize', 'bi bi-pencil-square', '/evidences/authorize', 2, 1, 1, GETDATE(), NULL, 1, NULL);
        `);

        await queryRunner.query(`INSERT INTO "rol_operations" ("rolId", "operationId", state, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES 
        (1, 1, 1, GETDATE(), NULL, 1, NULL),
        (1, 2, 1, GETDATE(), NULL, 1, NULL),
        (1, 3, 1, GETDATE(), NULL, 1, NULL),
        (1, 4, 1, GETDATE(), NULL, 1, NULL),
        (1, 5, 1, GETDATE(), NULL, 1, NULL),
        (1, 6, 1, GETDATE(), NULL, 1, NULL),
        (1, 7, 1, GETDATE(), NULL, 1, NULL),
        (1, 8, 1, GETDATE(), NULL, 1, NULL),
        (1, 9, 1, GETDATE(), NULL, 1, NULL),
        (1, 10, 1, GETDATE(), NULL, 1, NULL),
        (1, 11, 1, GETDATE(), NULL, 1, NULL),
        (1, 12, 1, GETDATE(), NULL, 1, NULL),
        (2, 1, 1, GETDATE(), NULL, 1, NULL),
        (2, 4, 1, GETDATE(), NULL, 1, NULL),
        (2, 9, 1, GETDATE(), NULL, 1, NULL),
        (2, 4, 1, GETDATE(), NULL, 1, NULL),
        (2, 8, 1, GETDATE(), NULL, 1, NULL),
        (2, 10, 1, GETDATE(), NULL, 1, NULL);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "rol_operations" WHERE "rolId" IN (1, 2) AND "operationId" IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);`);
        await queryRunner.query(`DELETE FROM "operations" WHERE Id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);`);
        await queryRunner.query(`DELETE FROM "modules" WHERE name IN ('Usuarios', 'Evidencias');`);
    }

}
