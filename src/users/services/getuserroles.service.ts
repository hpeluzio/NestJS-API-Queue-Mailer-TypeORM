import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GetUserRolesService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async exec(email: string): Promise<string | undefined | any> {
    const userExists = await this.usersRepository.findOne({ email: email });
    console.log('userExists isAdmin: ', userExists);
    return userExists.role;
  }
}
