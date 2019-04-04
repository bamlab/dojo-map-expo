import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateSearchable1554373305508 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`UPDATE place SET searchable = to_tsvector('french', place.name)`);
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`UPDATE place SET searchable = NULL`);
    }
}
