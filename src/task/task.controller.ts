import { Task } from './task.model';
import { TaskService } from './task.service';
import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TaskController {
    constructor(
       private taskService: TaskService
    ) {

    }

    @Get()
    GetTasks(): Task[] {
        return this.taskService.getTasks();
    }
}
