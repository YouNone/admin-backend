import { IUser } from './../share/type';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { ESex } from "src/share/type";
import { Group } from 'src/group/group.entity';

@Entity()
export class User implements IUser {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    login: string;

    @Column()
    email: string;

    @Column()
    sex: ESex;

    @Column()
    password: string;

    @Column({nullable: true})
    code: string
    
    @Column({nullable: true})
    group_id: number

    @Column()
    date_birth: string;
    
    @CreateDateColumn()
    date_create: string;
    
    @UpdateDateColumn()
    date_modify: string;
    
    @Column()
    date_hire: string;
    
	@Column({nullable: true})
    date_fire?: string;
    
    @ManyToOne(type => Group, group => group.users)
    group: Group;
}