import { ESex } from "src/share/type";
import { IsNotEmpty, IsOptional, MinLength, IsEmail } from "class-validator";

export class CreateUserDto {
	@IsNotEmpty()
	@MinLength(3)
	login: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@MinLength(5)
	full_name: string;

	@IsNotEmpty()
	sex: ESex;

	@IsNotEmpty()
	@MinLength(5)
	password: string;

	@IsNotEmpty()
	date_birth: Date;

	@IsNotEmpty()
	date_hire: Date;

	@IsOptional()
	date_fire?: Date;
}
