import { IUserAuth } from './../share/type';
import { SearchOptions } from './../share/class/searchOptions';
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
        const searchOptios = new SearchOptions(incomeQuery, Object.keys(new User())); 
		const qCondition = searchOptios.getQueryBuilderSearchStr('f', 'name', 'login');
		const list = await this.repo.createQueryBuilder()
			.where(qCondition, {f: `%${searchOptios.f}%`})
			.orderBy({[searchOptios.sort]: searchOptios.order})
			.skip(searchOptios.start)
			.take(searchOptios.limit)
			.getMany();
		
		return await list;

    }

    // async getUserByLogin(authInfo : IUserAuth): Promise<User> {
    //     const login = authInfo.login;
    //     const password = authInfo.password;

    //     const query = this.repo
    //     .createQueryBuilder()
    //     .where(`[user].[login] = :login`, {login})
    //     .andWhere(`[user].[password] = :password`, {password})
    //     .getOne();

    //     // const query = this.repo.query(`
    //     // SELECT * FROM [nest_admin].[dbo].[user]
    //     // WHERE [login] = ${authInfo.login} AND WHERE password = ${authInfo.password} 
    //     // `);
    //     return await query;
    // }

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
