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
	name: string;

	@IsNotEmpty()
	sex: ESex;

	@IsNotEmpty()
	@MinLength(5)
	password: string;

	@IsNotEmpty() 
	date_birth: string;

	@IsNotEmpty()
	date_hire: string;

	@IsOptional()
	date_fire?: string;
}
