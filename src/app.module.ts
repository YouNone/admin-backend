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

@Module({
  imports: [
      TypeOrmModule.forRoot(TypeOrmconfig),
      TypeOrmModule.forFeature([User]),
      TaskModule
      ],
  controllers: [
        UserController, 
        TaskController, 
        AppController
      ],
  providers: [
        TaskService, 
        UserService, 
        AppService
      ],
})
export class AppModule {}
