import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateDivisionDto {
    @IsNotEmpty()
    name: string;  
    
    @IsOptional()
    code: string

    @IsOptional()
    parent: {
        id: number
    }
   
}