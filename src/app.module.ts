import { GroupService } from './group/group.service';
import { GroupController } from './group/group.controller';
import { User } from './user/user.entity';
import { TaskModule } from './task/task.module';
import { TypeOrmconfig } from './config/typeorm.config';
import { TaskService } from './task/task.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { TaskController } from './task/task.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group/group.entity';

@Module({
  imports: [
      TypeOrmModule.forRoot(TypeOrmconfig),
      TypeOrmModule.forFeature([User, Group]),
      TaskModule
      ],
  controllers: [
        GroupController, 
        UserController, 
        TaskController, 
        AppController
      ],
  providers: [
        GroupService, 
        TaskService, 
        UserService, 
        AppService
      ],
})
export class AppModule {}
