import { TaskService } from './task.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { TaskRepository } from './task.repository';
import { TaskController } from './task.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([TaskRepository])
    ],
    controllers: [
        TaskController
    ],
    providers: [
        TaskService
    ]
})
export class TaskModule {

}