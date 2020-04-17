import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { ESex } from "src/share/type";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    email: string;
    
    @Column()
    full_name: string;

    @Column()
    sex: ESex;

    @Column()
    password: string;
    
    @Column()
    date_birth: string;
    
    @CreateDateColumn()
    date_create: string;
    
    @UpdateDateColumn()
    date_modify: string;
    
    @Column()
    date_hire: string;
    
    @Column()
	date_fire?: string;
}