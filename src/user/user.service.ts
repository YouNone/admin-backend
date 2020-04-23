import { GetUserFilterDto } from './dto/get-user-filter.dto';
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

    async getUsersList(filterDto: GetUserFilterDto): Promise<User[]> {
        const { search, full_name, sort_by } = filterDto;
        const query = this.userRepository.createQueryBuilder('user');


        if (sort_by) {
            query.orderBy(sort_by, "DESC");
        }

        if (filterDto.full_name) {
            query.andWhere('user.full_name = :full_name', { full_name })
        }

        if (filterDto.search) {
            query.andWhere(
                `(
                user.login LIKE :search 
                OR user.email LIKE :search
                OR user.date_birth LIKE :search
                OR user.date_create LIKE :search
                OR user.date_modify LIKE :search
                OR user.date_hire LIKE :search
                )`,
                { search: `%${search}%` }
            )
        }

        const users = query.getMany();
        return users;
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

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        // const found = await this.getUserById(id);
        // // console.log('found', found);
        // // console.log('updateUserDto', updateUserDto);
        // return await this.userRepository.update(id, {updateUserDto});
        updateUserDto.id = id;
        return await this.userRepository.save(updateUserDto);

    }

    async  deleteUser(id: number): Promise<void> {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with id "${id}" is not  found`);
        }

        // const found = await this.getUserById(id);
        // if (!found) {
        //     throw new NotFoundException(`User with id ${id} not found`);
        // }
        // const delUser = await this.userRepository.delete(id);
        // // if(delUser.affected === 0) throw new NotFoundException(` 2 User with id ${id} not found`);
        // return found;
    }
}
