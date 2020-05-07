import { DeleteExeption } from './../share/errorhandlers/deleteExeption';
import { ParseQuery } from './../share/parse.query';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>
    ) { }

    async getUsersList(incomeQuery: ParseQuery): Promise<User[]> {
        const searchOpt = new ParseQuery(incomeQuery, Object.keys(new User()));
        console.log(incomeQuery);
        const query = this.repo
            .createQueryBuilder('usr')
            .skip(searchOpt.start)
            .take(searchOpt.limit)
            .where(
                `usr.name LIKE :name 
                 OR usr.login LIKE :name
                 OR usr.email LIKE :name
                `,
                { name: `%${searchOpt.search}%` })
            .orderBy({ [searchOpt.sort]: searchOpt.order })
            .getMany();
        return await query;
    }

    async getUserById(id: number): Promise<User> {
        const found = this.repo.findOne(id);
        if (!found) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return found;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return await this.repo.save(createUserDto);
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        updateUserDto.id = id;
        return await this.repo.save(updateUserDto);

    }

    async  deleteUser(id: number): Promise<void> {
        const result = await this.repo.delete(id);
        if (result.affected === 0) {
            throw new DeleteExeption(id);
        }
    }
}
