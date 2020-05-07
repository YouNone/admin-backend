import { ETaskTypeStart } from './../../share/type';
import { IsNotEmpty, IsOptional, IsIn, IsDateString, IsMilitaryTime } from 'class-validator';
export class CreateTaskDto {
	/** Код */
	@IsOptional()
	code?: string;

	/** Название */
	@IsNotEmpty()
	name: string;

	@IsOptional()
	/** дата выполнения */
	date_execute?: string;

	@IsOptional()
	@IsIn(Object.values(ETaskTypeStart))
	/** Период выполнения */
	type_start: string;

	@IsOptional()
	@IsDateString()
	/** Дата начала запуска */
	date_start?: string;

	@IsOptional()
	@IsDateString()
	/** Дата окончания запуска */
	date_end?: string;

	/** Запускать с / Время запуска */
	@IsOptional()
	@IsMilitaryTime()
	time_start?: string;

	/** Запускать по */
	@IsOptional()
	@IsMilitaryTime()
	time_end?: string;

	/** Периодичность запуска (мин) / В день: */
	@IsOptional()
	execute_point?: string;
	
	/** Код монако */
	@IsOptional()
	script?: string;
}