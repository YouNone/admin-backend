import { ETaskTypeStart } from './../share/type';
export interface Task {
    /** id */
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