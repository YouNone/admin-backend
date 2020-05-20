import { AuthGuard } from '@nestjs/passport';
import { IUserAuth } from './share/type';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth/auth.service';
import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private authService: AuthService
	) { }

 
	// @UseGuards(AuthGuard('local'))
	// @Post('auth/login')
	// async login(@Request() req) {
	//   return this.authService.login(req.user);
	// }
}
 