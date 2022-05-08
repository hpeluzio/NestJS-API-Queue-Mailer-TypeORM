import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindUserByEmailService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async exec(email: string): Promise<Users | undefined | any> {
    return await this.usersRepository.findOne({ email: email });
  }
}