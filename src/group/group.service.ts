import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './group.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupQueryDto } from './dto/group-query.dto';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group) private groupRepository: Repository<Group>
    ) { }

    async getGroupsList(filterDto: GroupQueryDto): Promise<Group[]> {
        const { search, name } = filterDto;
        const query = this.groupRepository.createQueryBuilder('Group');

        if (filterDto.name) {
            query.andWhere('group.name = :name', { name })
        }

        if (filterDto.search) {
            query.andWhere(
                `(
                group.login LIKE :search 
                OR group.date_create LIKE :search
                OR group.date_modify LIKE :search
                )`,
                { search: `%${search}%` }
            )
        }

        const groups = query.getMany();
        return groups;
    }

    async getGroupById(id: number): Promise<Group> {
        const found = this.groupRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Group with id ${id} not found`);
        }
        return found;
    }

    async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
        return await this.groupRepository.save(createGroupDto);
    }

    async updateGroup(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
        updateGroupDto.id = id;
        return await this.groupRepository.save(updateGroupDto);

    }

    async  deleteGroup(id: number): Promise<void> {
        const result = await this.groupRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Group with id "${id}" is not  found`);
        }
    }
}
