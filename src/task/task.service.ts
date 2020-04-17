import { Task } from './task.model';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    tasks: Task[] = [];

    getTasks(): Task[] {
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const {
            code,
            name,
            date_create,
            date_modify,
            date_execute,
            type_start,
            date_start,
            date_end,
            time_start,
            time_end,
            execute_point,
            script
        } = createTaskDto;

        const task: Task = {
            code,
            name,
            date_create,
            date_modify,
            date_execute,
            type_start,
            date_start,
            date_end,
            time_start,
            time_end,
            execute_point,
            script
        }
        this.tasks.push(task);
        return task;
    }

}
