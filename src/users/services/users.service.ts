import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { UsersCreateDto } from 'src/users/models/dto/users.create.dto';

@Injectable()
export class UsersService {
  constructor(
    // @Inject('USERS_REPOSITORY')
    // private usersRepository: Repository<Users>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findOne(email: string): Promise<Users | undefined | any> {
    return await this.usersRepository.findOne({ email: email });
  }

  async findAll(): Promise<Users | undefined | any> {
    return await this.usersRepository.find();
  }
}
