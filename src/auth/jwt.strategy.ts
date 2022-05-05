import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_SECRET,
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);
    const { password, ...user } = payload;
    console.log('user', user);
    return { user_id: payload.sub, email: payload.email };
  }
}
