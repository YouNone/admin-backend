import { IsInt, Min } from "class-validator";
import { CreateScaleDto } from "./create-scale.dto";

export class UpdateScaleDto extends CreateScaleDto {
    @IsInt()
    @Min(0)
    id: number;
}