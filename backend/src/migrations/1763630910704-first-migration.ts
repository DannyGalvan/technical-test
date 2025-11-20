import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1763630910704 implements MigrationInterface {
    name = 'FirstMigration1763630910704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "modules" ("id" int NOT NULL IDENTITY(1,1), "name" varchar(100) NOT NULL, "description" text NOT NULL, "image" varchar(255) NOT NULL, "path" varchar(255) NOT NULL, "state" bit NOT NULL, "createdAt" datetime2 NOT NULL, "updatedAt" datetime2, "createdBy" int NOT NULL, "updatedBy" int, CONSTRAINT "PK_7dbefd488bd96c5bf31f0ce0c95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "operations" ("id" int NOT NULL IDENTITY(1,1), "guid" varchar(36) NOT NULL, "name" varchar(100) NOT NULL, "description" text NOT NULL, "policy" varchar(255) NOT NULL, "icon" varchar(100) NOT NULL, "path" varchar(255) NOT NULL, "moduleId" int NOT NULL, "isVisible" bit NOT NULL, "state" bit NOT NULL, "createdAt" datetime2 NOT NULL, "updatedAt" datetime2, "createdBy" int NOT NULL, "updatedBy" int, CONSTRAINT "PK_7b62d84d6f9912b975987165856" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rol_operations" ("id" int NOT NULL IDENTITY(1,1), "rolId" int NOT NULL, "operationId" int NOT NULL, "state" bit NOT NULL, "createdAt" datetime2 NOT NULL, "updatedAt" datetime2, "createdBy" int NOT NULL, "updatedBy" int, CONSTRAINT "PK_d2829a28d86361e1a857ce5164f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rol" ("id" int NOT NULL IDENTITY(1,1), "name" varchar(100) NOT NULL, "description" varchar(255) NOT NULL, "state" bit NOT NULL, "createdAt" datetime2 NOT NULL, "updatedAt" datetime2, "createdBy" int NOT NULL, "updatedBy" int, CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" int NOT NULL IDENTITY(1,1), "rolId" int NOT NULL, "name" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "password" varchar(100) NOT NULL, "state" bit NOT NULL, "createdAt" datetime2 NOT NULL, "updatedAt" datetime2, "createdBy" int NOT NULL, "updatedBy" int, "salt" nvarchar(255), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "operations" ADD CONSTRAINT "FK_f509aa159c2c80fee113c36b916" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rol_operations" ADD CONSTRAINT "FK_527ef88813cf956eaa3f9e979f9" FOREIGN KEY ("rolId") REFERENCES "rol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rol_operations" ADD CONSTRAINT "FK_7b7cda175b1356a0faab4f9df0d" FOREIGN KEY ("operationId") REFERENCES "operations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f66058a8f024b32ce70e0d6a929" FOREIGN KEY ("rolId") REFERENCES "rol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f66058a8f024b32ce70e0d6a929"`);
        await queryRunner.query(`ALTER TABLE "rol_operations" DROP CONSTRAINT "FK_7b7cda175b1356a0faab4f9df0d"`);
        await queryRunner.query(`ALTER TABLE "rol_operations" DROP CONSTRAINT "FK_527ef88813cf956eaa3f9e979f9"`);
        await queryRunner.query(`ALTER TABLE "operations" DROP CONSTRAINT "FK_f509aa159c2c80fee113c36b916"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "rol"`);
        await queryRunner.query(`DROP TABLE "rol_operations"`);
        await queryRunner.query(`DROP TABLE "operations"`);
        await queryRunner.query(`DROP TABLE "modules"`);
    }

}
