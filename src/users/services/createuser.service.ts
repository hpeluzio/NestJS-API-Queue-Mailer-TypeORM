import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from '../entities/dto/user.create.dto';
import { ResultDto } from 'src/common/dto/result.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async exec(body: UserCreateDto): Promise<ResultDto> {
    if (body.password != body.confirm_password) {
      throw new HttpException(
        `Password doesn't match.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const userExists = await this.usersRepository.findOne({
      email: body.email,
    });

    if (userExists) {
      throw new HttpException(`E-mail isn't avaible.`, HttpStatus.BAD_REQUEST);
    }

    try {
      const newUser = new Users();
      newUser.email = body.email;
      newUser.password = bcrypt.hashSync(body.password, 10);

      await this.usersRepository.save(newUser);

      return <ResultDto>{
        status: true,
        message: 'User created.',
      };
    } catch (error) {
      throw new HttpException('Error on create user.', HttpStatus.BAD_REQUEST);
    }
  }
}
