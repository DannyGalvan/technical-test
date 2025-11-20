import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExpedientsEntity1763636855548 implements MigrationInterface {
    name = 'AddExpedientsEntity1763636855548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "traceabilities" ("id" int NOT NULL IDENTITY(1,1), "expedientId" int NOT NULL, "createdUserId" int NOT NULL, "authorizeUserId" int NOT NULL, "documentStatusId" int NOT NULL, "comments" varchar(200) NOT NULL, "state" bit NOT NULL, "createdAt" datetime2 NOT NULL, "updatedAt" datetime2, "createdBy" int NOT NULL, "updatedBy" int, CONSTRAINT "PK_5a3b5d310857489c4892260ac82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "document-statuses" ("id" int NOT NULL IDENTITY(1,1), "name" varchar(100) NOT NULL, "state" bit NOT NULL, "createdAt" datetime2 NOT NULL, "updatedAt" datetime2, "createdBy" int NOT NULL, "updatedBy" int, CONSTRAINT "PK_f4de259b78a2b44aac7baabfb03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expedient-items" ("id" int NOT NULL IDENTITY(1,1), "expedientId" int NOT NULL, "description" varchar(200) NOT NULL, "color" varchar(100) NOT NULL, "size" varchar(50) NOT NULL, "weight" decimal(10,2) NOT NULL, "location" varchar(200) NOT NULL, "userId" int NOT NULL, "state" bit NOT NULL, "createdAt" datetime2 NOT NULL, "updatedAt" datetime2, "createdBy" int NOT NULL, "updatedBy" int, CONSTRAINT "PK_a7e473eeee2fb197c6b556876fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expedients" ("id" int NOT NULL IDENTITY(1,1), "userId" int NOT NULL, "authorizeUserId" int NOT NULL, "description" varchar(200) NOT NULL, "state" bit NOT NULL, "createdAt" datetime2 NOT NULL, "updatedAt" datetime2, "createdBy" int NOT NULL, "updatedBy" int, CONSTRAINT "PK_7abe96162f1ba6457c851d70f65" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "traceabilities" ADD CONSTRAINT "FK_3aa8e98d4aea3cdca5c4203ac65" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "traceabilities" ADD CONSTRAINT "FK_0792946c26b65d6d6f51412fc8e" FOREIGN KEY ("authorizeUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "traceabilities" ADD CONSTRAINT "FK_b3e3a3fe07c1453e4c748d97ae6" FOREIGN KEY ("documentStatusId") REFERENCES "document-statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expedient-items" ADD CONSTRAINT "FK_db779ec452a2a0b5abd7a5db34c" FOREIGN KEY ("expedientId") REFERENCES "expedients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expedient-items" ADD CONSTRAINT "FK_c8f34c00258b4dbf11948deea2c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expedients" ADD CONSTRAINT "FK_d434c2d5f452c6a30fef683fb81" FOREIGN KEY ("authorizeUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expedients" ADD CONSTRAINT "FK_3985af6a0c61b9c28977f55221e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expedients" DROP CONSTRAINT "FK_3985af6a0c61b9c28977f55221e"`);
        await queryRunner.query(`ALTER TABLE "expedients" DROP CONSTRAINT "FK_d434c2d5f452c6a30fef683fb81"`);
        await queryRunner.query(`ALTER TABLE "expedient-items" DROP CONSTRAINT "FK_c8f34c00258b4dbf11948deea2c"`);
        await queryRunner.query(`ALTER TABLE "expedient-items" DROP CONSTRAINT "FK_db779ec452a2a0b5abd7a5db34c"`);
        await queryRunner.query(`ALTER TABLE "traceabilities" DROP CONSTRAINT "FK_b3e3a3fe07c1453e4c748d97ae6"`);
        await queryRunner.query(`ALTER TABLE "traceabilities" DROP CONSTRAINT "FK_0792946c26b65d6d6f51412fc8e"`);
        await queryRunner.query(`ALTER TABLE "traceabilities" DROP CONSTRAINT "FK_3aa8e98d4aea3cdca5c4203ac65"`);
        await queryRunner.query(`DROP TABLE "expedients"`);
        await queryRunner.query(`DROP TABLE "expedient-items"`);
        await queryRunner.query(`DROP TABLE "document-statuses"`);
        await queryRunner.query(`DROP TABLE "traceabilities"`);
    }

}
