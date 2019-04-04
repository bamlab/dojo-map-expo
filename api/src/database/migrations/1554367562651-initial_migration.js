import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialMigration1554367562651 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "place_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, CONSTRAINT "PK_5a9a0f535f8481c45d83c280296" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "place" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "latitude" numeric NOT NULL, "longitude" numeric NOT NULL, "categoryId" uuid, CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "FK_4a3c2427bea45ebc6a549887663" FOREIGN KEY ("categoryId") REFERENCES "place_category"("id") ON DELETE SET NULL`);
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "FK_4a3c2427bea45ebc6a549887663"`);
        await queryRunner.query(`DROP TABLE "place"`);
        await queryRunner.query(`DROP TABLE "place_category"`);
    }

}
