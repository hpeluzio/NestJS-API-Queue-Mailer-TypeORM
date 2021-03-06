import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { FindUserByEmailService } from '../users/services/finduserbyemail.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly findUserByEmailService: FindUserByEmailService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('APP_SECRET'),
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const rawToken = req.headers['authorization'].split(' ')[1];

    const decodedJwtAccessToken: any = this.jwtService.decode(rawToken);

    if (!rawToken) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.findUserByEmailService.exec(payload.email);

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
    }

    if (decodedJwtAccessToken.password !== user.password) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return payload;
  }
}
