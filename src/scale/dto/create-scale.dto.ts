import { IScaleDiapasone, IScaleEnum, EScaleType, IScale } from './../../share/type';
import { IsNotEmpty, IsIn, IsOptional, MinLength } from "class-validator";

export class CreateScaleDto implements IScale {
    @MinLength(3)
    @IsNotEmpty()
    name: string;
    
	@IsOptional()
    code: string;

    @IsNotEmpty()
    @IsIn(Object.values(EScaleType))
    type: string;

    @IsNotEmpty() 
	scale: IScaleEnum | IScaleDiapasone;
}