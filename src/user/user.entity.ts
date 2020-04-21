import { IUser } from './../share/type';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { ESex } from "src/share/type";
import { Optional } from "@nestjs/common";
import { IsEmail } from "class-validator";

@Entity()
export class User implements IUser {

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
    date_birth: Date;
    
    @CreateDateColumn()
    date_create: Date;
    
    @UpdateDateColumn()
    date_modify: Date;
    
    @Column()
    date_hire: Date;
    
	@Column({nullable: true})
	date_fire?: Date;
}