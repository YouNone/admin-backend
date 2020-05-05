import { ETaskTypeStart } from './../share/type';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { ESex } from "src/share/type";
import { User } from 'src/user/user.entity';

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: true})
    code?: string;
    
    @Column()
    name: string;
    
    @CreateDateColumn()
    date_create?: string;
    
    @UpdateDateColumn()
    date_modify?: string;
    
    @Column({nullable: true})
    date_execute?: string;
    
    @Column()
    type_start?: ETaskTypeStart;
    
    @Column({nullable: true})
    date_start?: string;
    
    @Column({nullable: true})
    date_end?: string;
    
    @Column({nullable: true})
    time_start?: string;
    
    @Column({nullable: true})
    time_end?: string;
    
    @Column({nullable: true})
    execute_point?: string;
    
    @Column({nullable: true})
    script?: string;

    // @ManyToMany(type => User)
    // @JoinTable()
    // users: User[];

}