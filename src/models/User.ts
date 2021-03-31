import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 } from "uuid";
import { Helpers } from "../utils/Helpers";

@Entity('users')
class User {

    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Column()
    public readonly uuid: string;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @Column()
    public status: number;

    @CreateDateColumn()
    public created_at: Date;

}

export { User };