import { IDivision } from './../share/type';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Division implements IDivision {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: true})
    parent_id: number;

    @Column()
    name: string;

    @ManyToOne(type => Division, division => division.children)
    parent: Division;

    @OneToMany(type => Division, division => division.parent)
    children: Division[];

}