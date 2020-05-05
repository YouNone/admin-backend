import { IsInt, Min } from "class-validator";
import { CreateTaskDto } from "./create-task.dto";

export class UpdateTaskDto extends CreateTaskDto {
    @IsInt()
    @Min(0)
    id: number;
}