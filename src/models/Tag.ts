import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tags')
class Tag {

    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    title: string;
}

export { Tag }