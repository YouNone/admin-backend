import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Controller, Get, Post, Body, Param, Delete, Query, UsePipes, ValidationPipe, Put, Patch, ParseIntPipe } from '@nestjs/common';

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
    ) { }

    // @Get()
    // getAllUsers(@Query() filterDto: GetUserFilterDto): User[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.userService.getUserWithFilter(filterDto);

    //     } else return this.userService.getUsers();
    // }

    @Get('/:id')
    GetUserbyId(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        console.log(createUserDto);
        return this.userService.createUser(createUserDto);
    }

    @Put(':id')
	async updateItem(@Body() updateUserDto: UpdateUserDto) {
        return JSON.stringify(updateUserDto);
        // return this.userService.updateUser(updateUserDto);
	}

    // @Delete('/:id')
    // async deleteUser(@Param('id') id: string) {
    //     return  this.userService.deleteUser(id);
    // }
}
