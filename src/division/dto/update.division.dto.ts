import { CreateDivisionDto } from './create.division.dto';
import { IsInt, Min } from "class-validator";

export class UpdateDivisionDto extends CreateDivisionDto {
    @IsInt()
    @Min(0)
    id: number;
}