import { IsString, MinLength, Matches } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(3)
    login: string;
  
    // @IsString()
    @MinLength(3)
    // @Matches(
    //   /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    //   { message: 'password too weak' },
    // )
    password: string;
  }