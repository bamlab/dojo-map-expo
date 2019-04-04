import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class searchPlaces1554367562652 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('place', new TableColumn({
            name: 'searchable',
            type: 'TSVECTOR',
            isNullable: true,
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('place', 'searchable');
    }
}
