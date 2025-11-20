import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnDocumentStatusToExpedient1763649781221 implements MigrationInterface {
    name = 'AddColumnDocumentStatusToExpedient1763649781221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expedients" ADD "documentStatusId" int NOT NULL CONSTRAINT "DF_10e941e7f565c40670e0b6b48f1" DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "expedients" ADD CONSTRAINT "FK_10e941e7f565c40670e0b6b48f1" FOREIGN KEY ("documentStatusId") REFERENCES "document-statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expedients" DROP CONSTRAINT "FK_10e941e7f565c40670e0b6b48f1"`);
        await queryRunner.query(`ALTER TABLE "expedients" DROP CONSTRAINT "DF_10e941e7f565c40670e0b6b48f1"`);
        await queryRunner.query(`ALTER TABLE "expedients" DROP COLUMN "documentStatusId"`);
    }

}
