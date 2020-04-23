import { IsOptional, IsNotEmpty } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class GetUserFilterDto extends CreateUserDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsNotEmpty()
    sort_by: string;
}