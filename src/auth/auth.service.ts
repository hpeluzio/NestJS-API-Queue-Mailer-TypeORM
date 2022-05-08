import { Injectable } from '@nestjs/common';
import { FindUserByEmailService } from '../users/services/finduserbyemail.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private findUserByEmailService: FindUserByEmailService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.findUserByEmailService.exec(email);

    // console.log('AuthService : validateUser()');
    // console.log('user: ', user);

    if (bcrypt.compareSync(pass, user.password)) {
      // const { password, ...result } = user;
      return user;
    }

    return null;
  }

  async login(user: any) {
    console.log('login: user: ', user);
    console.log('login: user: ', user.password);
    const { id, email, password, role, is_active } = user;

    const access_token = this.jwtService.sign({
      id,
      email,
      password,
      role,
      is_active,
    });

    return {
      access_token,
      ...user,
    };
  }
}
