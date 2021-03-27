import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateToosTags1616845513843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const table = new Table({
            name: 'tools_tags',
            columns: [{
                name: 'idTool',
                type: 'int',
                unsigned: true,
                isPrimary: true
            }, {
                name: 'idTag',
                type: 'int',
                unsigned: true,
                isPrimary: true
            }, {
                name: 'created_at',
                type: 'timestamp',
                isNullable: false,
                default: 'now()'
            }],
            foreignKeys: [{
                name: 'FKTool',
                referencedTableName: 'tools',
                referencedColumnNames: ['id'],
                columnNames: ['idTool'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }, {
                name: 'FKTag',
                referencedTableName: 'tags',
                referencedColumnNames: ['id'],
                columnNames: ['idTag'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }],
            indices: [
                new TableIndex({name: "idx",columnNames: ['idTool', 'idTag']}),
                new TableIndex({name: "idxDate",columnNames: ['created_at']})
            ]
        });

        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const table = await queryRunner.getTable('tools_tags');
        await queryRunner.dropTable(table);
    }

}
