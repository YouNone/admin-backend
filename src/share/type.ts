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
    sort: string;
    order: ESort;
    // order_field: string;
    search: string;

}

export enum ESort {
	asc = "ASC",
	desc = "DESC"
}

export interface IUserAuth {
    login: string,
	password: string,
	token?: string
}
export interface IUser {
	id?: number;
	login: string;
	email: string;
	name: string;
	code?: string;
	sex: ESex;
	password: string;
	group_id: number
	date_birth: string;
	date_create: string;
	date_modify: string;
	date_hire: string;
	date_fire?: string;
}

export interface IGroup {
	/** ID группы */
	id?: number;
	/** Имя группы */
	name: string;
	/** Код группы */
	code?: string;
	/** дата создания группы */
	date_create?: string;
	date_modify?: string;
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

export interface IScale {
	/** ID Шкалы */
	id?: number;
	/** Название шкалы */
	name: string;
	/** Код шкалы */
	code?: string;
	/** Тип шкалы */
	type?: string;
	/** Шкала, диапазон или буллит */
	scale?: IScaleEnum | IScaleDiapasone;
	/** Дата создания */
	date_create?: Date;
	/** Дата последнего изменения */
	date_modify?: Date;
}


export interface IScaleDiapasone {
	/** Минимальное значание */
	min: number;
	/** Максимальное значание */
	max: number;
	/** Шаг */
	step: number;
}


/**
 * Шкала буллита
 *
 * @export
 * @interface IScaleEnumItem
 */
export interface IScaleEnumItem {
	/** Ценность(оценка) */
	value: number;
	/** Описание */
	description: string;
}

export enum EScaleType {
	diapasone = 'diapasone',
	enumerable = 'enumerable'
}

export declare type IScaleEnum = IScaleEnumItem[];

export interface IDivision {
	id?: number;
	name: string;

}

export interface IUniversalTreeNode {
	/** ID узла дерева. Только String! При очень больших числах JS теряет младшие разряды */
	id?: number,
	/** Текстовое представление узла дерева */
	name: string;
	/** Наследники текущего узла */
	children?: IUniversalTreeNode[];
	/** ID родителя записи. Если элемент является корнем дерева, это поле равно NULL или не определено */
	parent_id?: number;	
}

export interface ISearchOptions {
	/** Индекс первой строки в результатах выборки */
	start: number;
	/** Количество элементов в результате запроса */
	limit: number;
	/** Имя поля, по которому производится сортировка выборки */
	sort?: string;
	/** Порядок сортировки ASC/DESC */
	order?: 'ASC' | 'DESC';
	/** Строка по которой производится поиск по полю field */
	f?: string;
	/** Поле в таблице данных, по которому производится поиск */
	field?: string;
	/** Вторая строка поиска по которой производится фильтрация данных */
	f2?: string;
	/** Второе поле по которому производтся фильтрация данных */
	field2?: string;
}


export const alowedFields = ['name', 'login', 'email', 'code', 'type_start', 'date_execute', 'type_start'];

