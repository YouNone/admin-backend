import { IsOptional, IsNotEmpty } from "class-validator";
import { CreateDivisionDto } from "./create.division.dto";

export class DivisionFilterDto extends CreateDivisionDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsNotEmpty()
    sort_by: string;
}