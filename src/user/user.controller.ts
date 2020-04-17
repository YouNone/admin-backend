import { UpdateUserDto } from './dto/update-user.dto';
import { UserUpdateValidationPipe } from './pipes/user-validation.pipe';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UserService } from './user.service';
import { Controller, Get, Post, Body, Param, Delete, Query, UsePipes, ValidationPipe, Put, Patch } from '@nestjs/common';

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get()
    getAllUsers(@Query() filterDto: GetUserFilterDto): User[] {
        if (Object.keys(filterDto).length) {
            return this.userService.getUserWithFilter(filterDto);

        } else return this.userService.getUsers();
    }

    @Get('/:id')
    GetUserbyId(@Param('id') id: string): User {
        return this.userService.getUserById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
        
        return this.userService.createUser(createUserDto);
    }

    @Patch('/:id')
    updateUser(
        @Param('id') id: string,
        @Body(UserUpdateValidationPipe) updateUserDto: UpdateUserDto,
        ): User {
            return this.updateUser(id, updateUserDto);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        this.userService.deleteUser(id);
    }
}
