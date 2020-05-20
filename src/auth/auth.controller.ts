import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from 'src/user/user.entity';
import { IUserAuth } from './../share/type';
import { AuthService } from './auth.service';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';

@Controller('users')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    // @UseGuards(JwtAuthGuard)
    @Post('/login') 
    GetUserbyLogin(@Body() authUser: IUserAuth): Promise<any> {
        return this.authService.getUserAccess(authUser);
    }
}
