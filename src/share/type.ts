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
	id: number;
	login: string;
	email: string;
	full_name: string;
	sex: ESex;
	password: string;
	date_birth: Date;
	date_create: Date;
	date_modify: Date;
	date_hire: Date;
	date_fire?: Date;
}

