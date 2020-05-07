import { IScale, EScaleType, IScaleEnum, IScaleDiapasone } from './../share/type';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Scale implements IScale {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    code: string;

    @Column()
    type: string;

    @Column('simple-json')
    scale: IScaleDiapasone | IScaleEnum; 

    @CreateDateColumn()
    date_create: Date;

    @UpdateDateColumn()
    date_modify: Date;
    
    // constructor(item: IScale = <IScale> {}) {
	// 	this.id = item.id || undefined;
	// 	this.name = item.name || '';
	// 	this.code = item.code || undefined;
	// 	this.type = item.type || EScaleType.diapasone;
	// 	this.scale = item.scale || {min: 0, max: 100, step: 10};
	// 	this.date_create = item.date_create ? item.date_create : null;
	// 	this.date_modify = item.date_modify ? item.date_modify : null;
	// }

}