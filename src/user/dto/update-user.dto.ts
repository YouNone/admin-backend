import { IsInt, Min, } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends CreateUserDto{

    @IsInt()
    @Min(0)
    id: number;
}