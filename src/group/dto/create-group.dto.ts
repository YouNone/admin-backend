import { IsNotEmpty, MinLength, IsOptional } from "class-validator";
import { IGroup } from "src/share/type";

export class CreateGroupDto implements IGroup {
    @IsNotEmpty()
	@MinLength(3)
    name: string;

    @IsOptional()
    code: string;
}