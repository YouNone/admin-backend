import { IsOptional } from "class-validator";

export class GetUserFilterDto {
    @IsOptional()
    search: string;
    @IsOptional()
    full_name: string;
}