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

export interface IrequestParams {
    start: number;
    limit: number;
    sort: ESort;
    order_field: string;
    search: string;

}

export enum ESort {
	asc = "asc",
	desc = "desc"
}


export interface IUser {
	id?: number;
	login: string;
	email: string;
	name: string;
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
export interface ITask {
	id?: string;
	/** Код */
	code?: string;
	/** Название */
	name: string;
	/** дата создания */
	date_create?: string;
	/** дата редактирования */
	date_modify?: string;
	/** дата выполнения */
	date_execute?: string;
	/** Период выполнения */
	type_start?: ETaskTypeStart;
	/** Дата начала запуска */
	date_start?: string;
	/** Дата окончания запуска */
	date_end?: string;
	/** Запускать с / Время запуска */
	time_start?: string;
	/** Запускать по */
	time_end?: string;
	/** Периодичность запуска (мин) / В день: */
	execute_point?: string;
	/** Код монако */
	script?: string;
}
export interface IDivision {
	id?: number;
	// parentId: number | null;
	name: string;

}

export const alowedFields = ['name', 'login', 'email', 'code', 'full_name'];

