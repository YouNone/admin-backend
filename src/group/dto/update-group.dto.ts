import { CreateGroupDto } from './create-group.dto';
import { IsInt, Min } from 'class-validator';
export class UpdateGroupDto extends CreateGroupDto {

    @IsInt()
    @Min(0)
    id: number;
}