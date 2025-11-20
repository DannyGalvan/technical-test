import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthorizedUserChangeToNullExpedients1763637883235 implements MigrationInterface {
    name = 'AuthorizedUserChangeToNullExpedients1763637883235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expedients" DROP CONSTRAINT "FK_d434c2d5f452c6a30fef683fb81"`);
        await queryRunner.query(`ALTER TABLE "expedients" ALTER COLUMN "authorizeUserId" int`);
        await queryRunner.query(`ALTER TABLE "expedients" ADD CONSTRAINT "FK_d434c2d5f452c6a30fef683fb81" FOREIGN KEY ("authorizeUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expedients" DROP CONSTRAINT "FK_d434c2d5f452c6a30fef683fb81"`);
        await queryRunner.query(`ALTER TABLE "expedients" ALTER COLUMN "authorizeUserId" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "expedients" ADD CONSTRAINT "FK_d434c2d5f452c6a30fef683fb81" FOREIGN KEY ("authorizeUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
