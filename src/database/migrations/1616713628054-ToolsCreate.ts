import { table } from "node:console";
import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class ToolsCreate1616713628054 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('tools');
    }

}
