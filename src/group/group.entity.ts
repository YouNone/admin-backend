import { IGroup } from "src/share/type";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { User } from "src/user/user.entity";

@Entity()
export class Group implements IGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    code?: string;

    @CreateDateColumn()
    date_create?: Date;
    
    @UpdateDateColumn()
    date_modify?: Date;
    
    @Column({nullable: true})
    count?: number;

    @OneToMany(type => User, user => user.group)
    users: User[];
}