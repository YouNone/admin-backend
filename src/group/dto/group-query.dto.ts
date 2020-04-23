import { CreateGroupDto } from './create-group.dto';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class GroupQueryDto extends CreateGroupDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsNotEmpty()
    sort_by: string;
}