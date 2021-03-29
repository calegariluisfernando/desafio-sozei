import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./Tag";

@Entity('tools')
class Tool {

    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    title: string;

    @Column()
    link: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date

    @ManyToMany(() => Tag)
    @JoinTable({ 
        name: 'tools_tags',
        joinColumn: {
            name: 'idTool',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'idTag',
            referencedColumnName: 'id'
        }
     })
    tags: Tag[];
}

export { Tool }