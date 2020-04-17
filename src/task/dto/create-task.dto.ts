import { ETaskTypeStart } from './../../share/type';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateTaskDto {
	/** Код */
	@IsOptional()
	code?: string;

	/** Название */
	@IsNotEmpty()
	name: string;

	/** дата создания */
	@IsNotEmpty()
	date_create: string;

	/** дата редактирования */
	@IsOptional()
	date_modify?: string;

	@IsOptional()
	/** дата выполнения */
	date_execute?: string;

	@IsOptional()
	/** Период выполнения */
	type_start?: ETaskTypeStart;

	@IsOptional()
	/** Дата начала запуска */
	date_start?: string;

	@IsOptional()
	/** Дата окончания запуска */
	date_end?: string;

	/** Запускать с / Время запуска */
	@IsOptional()
	time_start?: string;

	/** Запускать по */
	@IsOptional()
	time_end?: string;

	/** Периодичность запуска (мин) / В день: */
	@IsOptional()
	execute_point?: string;
	
	/** Код монако */
	@IsOptional()
	script?: string;
}