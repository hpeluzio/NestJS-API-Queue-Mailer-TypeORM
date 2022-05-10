import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultDto } from '../../common/dto/result.dto';
import * as bcrypt from 'bcrypt';
import { UserUpdateDto } from '../entities/dto/user.update.dto';

@Injectable()
export class UpdateUserService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async exec(id: string, body: UserUpdateDto, user): Promise<ResultDto> {
    if (user.id !== Number(id)) {
      throw new HttpException(`Unauthorized.`, HttpStatus.UNAUTHORIZED);
    }

    const userExists = await this.usersRepository.findOne({
      email: body.email,
    });

    if (userExists && userExists.email !== user.email) {
      throw new HttpException(`E-mail isn't avaible.`, HttpStatus.BAD_REQUEST);
    }

    const userToBeUpdated = await this.usersRepository.findOne({
      id: Number(id),
    });

    if (!userToBeUpdated) {
      throw new HttpException(`User not found.`, HttpStatus.BAD_REQUEST);
    }

    try {
      userToBeUpdated.email = body.email;
      userToBeUpdated.password = bcrypt.hashSync(body.password, 10);
      await this.usersRepository.save(userToBeUpdated);

      return <ResultDto>{
        status: true,
        message: 'User updated.',
      };
    } catch (error) {
      throw new HttpException('Error on create user.', HttpStatus.BAD_REQUEST);
    }
  }
}
