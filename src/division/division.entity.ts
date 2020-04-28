import { IDivision } from './../share/type';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Tree } from "typeorm";

@Entity()
@Tree("adjacency-list")

export class Division implements IDivision {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: true})
    parent_id: number | null;

    @Column()
    name: string;

    @ManyToOne(type => Division, division => division.children)
    parent: Division;

    @OneToMany(type => Division, division => division.parent)
    children: Division[];

}