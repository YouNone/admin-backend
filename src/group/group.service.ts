import { ParseQuery } from './../share/parse.query';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './group.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group) private groupRepository: Repository<Group>
    ) { }

    async getGroupsList(incomeQuery: ParseQuery): Promise<Group[]> {
        const searchOpt = new ParseQuery(incomeQuery, Object.keys(new Group()));
        // console.log(searchOpt);
        console.log(incomeQuery);
        
        const query = this.groupRepository
        .createQueryBuilder('gr')
        .select(['gr.id', 'gr.code', 'gr.name', 'gr.date_create', 'gr.date_modify'])
        .skip(searchOpt.start)
        .take(searchOpt.limit)
        .where('gr.name LIKE :name OR gr.code LIKE :name', {name: `%${searchOpt.search}%`})
        .orderBy(searchOpt.order_field).getMany();

        // this.groupRepository.find({
        //     where: [
        //         {name: `group1 test 1`}
        //     ]
        // });

        return await query;
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
