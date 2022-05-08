import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindAllUsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async exec(): Promise<Users | undefined | any> {
    return await this.usersRepository.find();
  }
}
