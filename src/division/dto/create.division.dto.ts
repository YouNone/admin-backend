import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateDivisionDto {
    @IsNotEmpty()
    name: string;  
        
    @IsOptional()
    parent: {
        id: number
    }
   
}