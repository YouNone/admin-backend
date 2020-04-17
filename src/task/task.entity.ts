import { ETaskTypeStart } from './../share/type';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ESex } from "src/share/type";

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    code?: string;
    
    @Column()
    name: string;
    
    @CreateDateColumn()
    date_create?: string;
    
    @UpdateDateColumn()
    date_modify?: string;
    
    @Column()
    date_execute?: string;
    
    @Column()
    type_start?: ETaskTypeStart;
    
    @Column()
    date_start?: string;
    
    @Column()
    date_end?: string;
    
    @Column()
    time_start?: string;
    
    @Column()
    time_end?: string;
    
    @Column()
    execute_point?: string;
    
    @Column()
    script?: string;

}