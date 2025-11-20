import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthorizedUserChangeToNullTraceabilities1763654151353 implements MigrationInterface {
    name = 'AuthorizedUserChangeToNullTraceabilities1763654151353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "traceabilities" DROP CONSTRAINT "FK_0792946c26b65d6d6f51412fc8e"`);
        await queryRunner.query(`ALTER TABLE "traceabilities" ALTER COLUMN "authorizeUserId" int`);
        await queryRunner.query(`ALTER TABLE "traceabilities" ADD CONSTRAINT "FK_0792946c26b65d6d6f51412fc8e" FOREIGN KEY ("authorizeUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "traceabilities" DROP CONSTRAINT "FK_0792946c26b65d6d6f51412fc8e"`);
        await queryRunner.query(`ALTER TABLE "traceabilities" ALTER COLUMN "authorizeUserId" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "traceabilities" ADD CONSTRAINT "FK_0792946c26b65d6d6f51412fc8e" FOREIGN KEY ("authorizeUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
