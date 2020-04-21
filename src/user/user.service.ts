import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    // getUserWithFilter(filterDto: GetUserFilterDto): User[] {
    //     const { search, full_name } = filterDto

    //     let users = this.getUsers();
    //     if (full_name) {
    //         users = users.filter(user => user.full_name === full_name);
    //     }
    //     if (search) {
    //         users = users.filter(user => user.login.includes(search));
    //     }
    //     return users;
    // }

    async getUsersList() {
        // return this.userRepository
    }

    async getUserById(id: number): Promise<User> {
        const found = this.userRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return found;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.save(createUserDto);
    }

    async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
        return await this.userRepository.save(updateUserDto);
    }

    // deleteUser(id: string): void {
    //     const found = this.getUserById(id);
    //     this.users = this.users.filter(user => user.id !== found.id);
    // }
}
