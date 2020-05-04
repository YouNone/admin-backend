import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity()
@Tree("nested-set")

export class Division {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @TreeChildren()
    children: Division[];

    @TreeParent()
    parent: Division;
}