import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { UsersCreateDto } from 'src/users/models/dto/users.create.dto';

@Injectable()
export class FindAllService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async execute(): Promise<Users | undefined | any> {
    return await this.usersRepository.find();
  }
}
