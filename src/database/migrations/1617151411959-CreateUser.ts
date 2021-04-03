import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateUser1617151411959 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [{
                    name: 'id',
                    type: 'int',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                }, {
                    name: 'uuid',
                    type: 'char',
                    length: '36',
                    isNullable: false
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '100',
                    isNullable: false
                }, {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isNullable: false
                }, {
                    name: 'password',
                    type: 'char',
                    length: '32',
                    isNullable: false,
                }, {
                    name: 'isActive',
                    type: 'boolean',
                    isNullable: false,
                    default: true
                }, {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'now()'
                }],
                indices: [
                    new TableIndex({ name: 'idxChaveUuid', columnNames: [ 'uuid' ], isUnique: true }),
                    new TableIndex({ name: 'idxChaveEmail', columnNames: [ 'email' ], isUnique: true }),
                    new TableIndex({ name: 'idxName', columnNames: [ 'name' ] }),
                    new TableIndex({ name: 'idxUuid', columnNames: [ 'uuid' ] }),
                    new TableIndex({ name: 'idxEmail', columnNames: [ 'email' ] }),
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('users');
    }

}
