import { Injectable } from '@nestjs/common';
import { FindOneService } from '../users/services/findone.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private findOneService: FindOneService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log(email, pass);
    const user = await this.findOneService.exec(email);
    console.log(pass, user.password);

    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }

    if (bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
