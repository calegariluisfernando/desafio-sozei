import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 } from "uuid";
import { Helpers } from "../utils/Helpers";

@Entity('users')
class User {

    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Column()
    public uuid: string;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @Column()
    public isActive: boolean;

    @CreateDateColumn()
    public created_at: Date;

    @BeforeInsert()
    generatePasswordHash() {

        this.uuid = v4();
        this.password =  Helpers.generateMd5(this.password);

    }

}

export { User };