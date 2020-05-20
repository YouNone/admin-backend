import { IUserAuth } from '../share/type';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { jwtConstants } from './auth.constans';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
 
  async validate(authInfo: IUserAuth): Promise<any> {    
    const user = await this.authService.getUserAccess(authInfo);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}