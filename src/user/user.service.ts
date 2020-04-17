import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ESex } from 'src/share/type';

@Injectable()
export class UserService {
    users: User[] = [];

    getUsers(): User[] {
        return this.users;
    }

    getUserWithFilter(filterDto: GetUserFilterDto): User[] {
        const { search, full_name } = filterDto

        let users = this.getUsers();
        if (full_name) {
            users = users.filter(user => user.full_name === full_name);
        }
        if (search) {
            users = users.filter(user => user.login.includes(search));
        }
        return users;
    }

    getUserById(id: string) {
        const found = this.users.find(user => user.id = id);

        if (!found) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return found;
    }

    createUser(createUserDto: CreateUserDto): User {

        const {
            login,
            email,
            full_name,
            sex,
            password,
            date_birth,
            date_create,
            date_modify,
            date_hire
        } = createUserDto;

        const user: User = {
            id: '1',
            login,
            email,
            full_name,
            sex: ESex.Male,
            password,
            date_birth,
            date_create,
            date_modify,
            date_hire
        }
        this.users.push(user);
        return user;
    }

    updateUser(
        id: string, 
        incomeUser: CreateUserDto
        ) {
        let updateUser = this.users.find(user => user.id = id);
        updateUser = Object.assign(incomeUser);
        // updateUser.full_name = incomeUser.full_name;
        // updateUser.login = incomeUser.login;
        // updateUser.sex = incomeUser.sex;
        // updateUser.email = incomeUser.email;
        // updateUser.password = incomeUser.password;
        // updateUser.date_birth = incomeUser.date_birth;
        // updateUser.date_create = incomeUser.date_create;
        // updateUser.date_modify = incomeUser.date_modify;
        // updateUser.date_hire = incomeUser.date_hire;
        console.log(updateUser);
        
    }

    deleteUser(id: string): void {
        const found = this.getUserById(id);

        this.users = this.users.filter(user => user.id !== found.id);
    }
}
