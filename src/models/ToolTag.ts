import { CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity('tools_tags')
class ToolTag {

    @PrimaryColumn()
    readonly idTool: number;

    @PrimaryColumn()
    readonly idTag: number;

    @CreateDateColumn()
    created_at: Date;
}