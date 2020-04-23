import { IsNotEmpty } from "class-validator";

export class CreateDivisionDto {
    @IsNotEmpty()
    name: string;
}