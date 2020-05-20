import { alowedFields, IUserAuth } from './../share/type';
import { ParseQuery } from './../share/parse.query';
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

    @Get()
    getAllUsers(@Query() queryParser) {
        const searcParams = new ParseQuery(queryParser, alowedFields);
        return this.userService.getUsersList(searcParams);
    }

    @Get(':id')
    GetUserbyId(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.getUserById(id);
    }
// auth post
    // localhost:3000/users/login/1?login=login1&password=1111

    // Post localhost:3000/users/login
    // {
    //     'login': "login1",
    //     "password": "2222"
    // }
    // @Post('/login')
    // GetUserbyLogin(@Body() authUser: IUserAuth): Promise<User> {
    //     return this.userService.getUserByLogin(authUser);
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        console.log(createUserDto);
        return this.userService.createUser(createUserDto);
    }

    @Put(':id')
    async updateItem(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ) {
        // return JSON.stringify(updateUserDto);
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }
}
