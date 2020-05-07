import { DeleteExeption } from './../share/errorhandlers/deleteExeption';
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
        @InjectRepository(Group) private repo: Repository<Group>
    ) { }

    async getGroupsList(incomeQuery: ParseQuery): Promise<Group[]> {
        const searchOpt = new ParseQuery(incomeQuery, Object.keys(new Group()));
        // console.log(searchOpt);
        console.log(incomeQuery);

        const query = this.repo
            .createQueryBuilder('gr')
            // .select(['gr.id', 'gr.code', 'gr.name', 'gr.date_create', 'gr.date_modify'])
            .skip(searchOpt.start)
            .take(searchOpt.limit)
            .where('gr.name LIKE :name OR gr.code LIKE :name', { name: `%${searchOpt.search}%` })
            .orderBy({ [searchOpt.sort]: searchOpt.order })
            .getMany();
        return await query;
    }

    async getGroupById(id: number): Promise<Group> {
        const found = this.repo.findOne(id);
        if (!found) {
            throw new NotFoundException(`Group with id ${id} not found`);
        }
        return found;
    }

    async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
        return await this.repo.save(createGroupDto);
    }

    async updateGroup(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
        updateGroupDto.id = id;
        return await this.repo.save(updateGroupDto);

    }

    async  deleteGroup(id: number): Promise<Group> {
        const delTask = await this.getGroupById(id);
        const result = await this.repo.delete(id);
        if (result.affected === 0) {
            throw new DeleteExeption(id);
        }
        return delTask;
    }
}
