export enum ESex {
	/** Мужской пол */
	Male = 1,
	/** Женский пол */
	Female = 2
}

export enum ETaskTypeStart {
	never = "never",
	period = "period",
	day = "day",
	week = "week",
	month = "month"
}

export interface IUser {
	id?: number;
	login: string;
	email: string;
	full_name: string;
	sex: ESex;
	password: string;
	group_id: number
	date_birth: Date;
	date_create: Date;
	date_modify: Date;
	date_hire: Date;
	date_fire?: Date;
}

export interface IGroup {
	/** ID группы */
	id?: number;
	/** Имя группы */
	name: string;
	/** Код группы */
	code?: string;
	/** дата создания группы */
	date_create?: Date;
	date_modify?: Date;
	/** Количество пользователей группы */
	count?: number;
	/** Члены группы */
	// user?: IUserWithPosition[]
	/** Руководители группы */
	// boss?: IUserWithPosition[]
}

export interface IDivision {
	id?: number;
	parent_id: number | null;
	name: string;

}

