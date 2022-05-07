import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CheckEmailService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async exec(email: string): Promise<Users | undefined | any> {
    const userExists = await this.usersRepository.findOne({ email: email });

    if (userExists) {
      throw new HttpException('E-mail unavaible', 451);
    } else {
      return {
        statusCode: 200,
        message: 'E-mail avaible.',
        available: true,
      };
    }
  }
}
