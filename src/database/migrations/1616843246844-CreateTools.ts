import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateTools1616843246844 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const table = new Table({
            name: 'tools',
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
                length: '45',
                isNullable: false,
            }, {
                name: 'link',
                type: 'varchar',
                length: '255',
                isNullable: true,
            }, {
                name: 'description',
                type: 'text',
                isNullable: true,
            }, {
                name: 'created_at',
                type: 'timestamp',
                isNullable: false,
                default: 'now()'
            }],
            indices: [
                new TableIndex({name: "idxTitle", columnNames: ['title']}),
                new TableIndex({name: "idxLink", columnNames: ['link']}),
                new TableIndex({name: "idxDate", columnNames: ['created_at']})
            ]
        });

        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const table = await queryRunner.getTable('tools');
        await queryRunner.dropTable(table);
    }

}
