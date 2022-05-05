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
    const user = await this.findOneService.exec(email);

    if (bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const { id, email, role, is_active, subscription, created_at, updated_at } =
      user;

    return {
      access_token: this.jwtService.sign({
        id,
        email,
        role,
        is_active,
        subscription,
        created_at,
        updated_at,
      }),
    };
  }
}
