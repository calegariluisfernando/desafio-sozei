import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateTags1616845346777 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const table = new Table({
            name: 'tags',
            columns: [{
                name: 'id',
                type: 'int',
                unsigned: true,
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            }, {
                name: 'title',
                type: 'varchar',
                length: '10',
                isNullable: false,
            }, {
                name: 'created_at',
                type: 'timestamp',
                isNullable: false,
                default: 'now()'
            }],
            indices: [
                new TableIndex({name: "idxTitle", columnNames: ['title']}),
                new TableIndex({name: "idxDate", columnNames: ['created_at']})
            ]
        });

        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const table = await queryRunner.getTable('tags');
        await queryRunner.dropTable(table);
    }

}
