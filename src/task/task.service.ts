import { ParseQuery } from './../share/parse.query';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteExeption } from './../share/errorhandlers/deleteExeption';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteResult, Repository } from 'typeorm';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task) private repo: Repository<Task>
    ) { }

    async getTasksList(incomeQuery: ParseQuery): Promise<Task[]> {
        const searchOpt = new ParseQuery(incomeQuery, Object.keys(new Task()));
        // console.log(searchOpt);
        
        const query = this.repo
        .createQueryBuilder('task')
        .skip(searchOpt.start)
        .take(searchOpt.limit)
        .where('task.name LIKE :name OR task.code LIKE :name', {name: `%${searchOpt.search}%`})
        .orderBy({[searchOpt.sort]: searchOpt.order})
        .getMany();
        return await query;
    }
    async getTaskById(id: number): Promise<Task> {
        const found = await this.repo.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.repo.save(createTaskDto);
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        updateTaskDto.id = id;
        return await this.repo.save(updateTaskDto);
    }

    async deleteTask(id: number): Promise<Task> {
        const delTask = await this.getTaskById(id);
        const result = await this.repo.delete(id);
        if (result.affected === 0) {
            throw new DeleteExeption(id);
        }
        return delTask;
    }
}
