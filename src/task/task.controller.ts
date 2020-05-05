import { alowedFields } from './../share/type';
import { ParseQuery } from './../share/parse.query';
import { TaskService } from './task.service';
import { Controller, Get, Query, Param, UsePipes, Post, Body, Put, Delete, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TaskController {
    constructor(
        private taskService: TaskService
    ) {

    }
    @Get()
    getAllTasks(@Query() queryParser) {
        const searcParams = new ParseQuery(queryParser, alowedFields);
        // console.log(searcParams); 
        return this.taskService.getTasksList(searcParams);
    }

    @Get(':id')
    GetTaskbyId(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        // console.log(createTaskDto);
        return this.taskService.createTask(createTaskDto);
    }

    @Put(':id')
    async updateItem(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTaskDto: UpdateTaskDto
    ) {
        // return JSON.stringify(updateTaskDto);
        return this.taskService.updateTask(id, updateTaskDto);
    }

    @Delete(':id')
    async deleteTask(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.deleteTask(id);
    }
}
