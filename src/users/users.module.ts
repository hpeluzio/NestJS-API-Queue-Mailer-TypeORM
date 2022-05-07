import { Module } from '@nestjs/common';
import { UsersController } from 'src/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { FindAllService } from 'src/users/services/findall.service';
import { FindOneService } from 'src/users/services/findone.service';
import { CreateUserService } from 'src/users/services/createuser.service';
import { UpdateUserService } from 'src/users/services/updateuser.service';
import { CheckEmailService } from 'src/users/services/checkemail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [
    FindOneService,
    FindAllService,
    CreateUserService,
    UpdateUserService,
    CheckEmailService,
  ],
  controllers: [UsersController],
  exports: [
    FindOneService,
    FindAllService,
    CreateUserService,
    UpdateUserService,
    CheckEmailService,
  ],
})
export class UsersModule {}
