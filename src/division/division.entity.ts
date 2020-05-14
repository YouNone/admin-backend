import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeChildren, TreeParent, JoinColumn } from "typeorm";

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

    @Column({nullable: true})
    code: string;

    @Column({nullable: true})
    parent_id: number;

    @TreeChildren()
    children: Division[];

    @TreeParent()
    @JoinColumn({name: 'parent_id'})
    parent: Division;
}