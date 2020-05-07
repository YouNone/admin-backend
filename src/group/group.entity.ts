import { IGroup } from "src/share/type";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { User } from "src/user/user.entity";

@Entity()
export class Group implements IGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        nullable: true,
        default: "code"
    })
    code?: string;

    @CreateDateColumn()
    date_create?: string;
    
    @UpdateDateColumn()
    date_modify?: string;

    @OneToMany(type => User, user => user.group)
    users: User[];
}