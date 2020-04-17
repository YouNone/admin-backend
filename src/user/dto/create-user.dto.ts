import { ESex } from "src/share/type";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
	@IsNotEmpty()
	login: string;
	@IsNotEmpty()
	email: string;
	@IsNotEmpty()
	full_name: string;
	@IsNotEmpty()
	sex: ESex;
	@IsNotEmpty()
	password: string;
	@IsNotEmpty()
	date_birth: string;
	@IsNotEmpty()
	date_create: string;
	@IsNotEmpty()
	date_modify: string;
	@IsNotEmpty()
	date_hire: string;
	@IsOptional()
	date_fire?: string;
}
