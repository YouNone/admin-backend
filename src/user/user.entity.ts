import { IUser } from './../share/type';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { ESex } from "src/share/type";
import { Group } from 'src/group/group.entity';

@Entity()
export class User implements IUser {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    full_name: string;

    @Column()
    login: string;

    @Column()
    email: string;

    @Column()
    sex: ESex;

    @Column()
    password: string;
    
    @Column()
    group_id: number

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
    
    @ManyToOne(type => Group, group => group.users)
    group: Group;
}