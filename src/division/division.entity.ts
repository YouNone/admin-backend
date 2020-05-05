import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity({
    orderBy: {
        name: "ASC",
        id: "DESC"
    }
})
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