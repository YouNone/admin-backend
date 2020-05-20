import { IUserAuth } from './../share/type';
import { UserService } from './../user/user.service';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { Injectable, Logger, UnauthorizedException, InternalServerErrorException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
        private jwtService: JwtService,
    ) { }

    // async getUserAccess(authInfo: IUserAuth): Promise<User> {
    async getUserAccess(authInfo: IUserAuth): Promise<any> {
        const login = authInfo.login;
        const password = authInfo.password;
        const query = await this.repo
            .createQueryBuilder()
            .where(`[user].[login] = :login`, { login })
            .andWhere(`[user].[password] = :password`, { password })
            .getOne();

        if (query == undefined || query == null || Object.keys(query).length === 0) {
            throw new NotFoundException("User not found")
        } else {
            const token = await this.jwtService.sign(authInfo);
            // console.log("token", token);
            return await { query, token };
        }
    }

    // async login(user: IUserAuth) {
    //     // const payload = { login: user.login, password: user.password };
    //     return {
    //         access_token: this.jwtService.sign(user)
    //     };
    // }

}