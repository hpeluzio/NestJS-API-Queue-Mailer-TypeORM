import { Module } from '@nestjs/common';
import { UsersController } from 'src/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { FindAllUsersService } from 'src/users/services/findallusers.service';
import { FindUserByEmailService } from 'src/users/services/finduserbyemail.service';
import { CreateUserService } from 'src/users/services/createuser.service';
import { UpdateUserService } from 'src/users/services/updateuser.service';
import { CheckEmailService } from 'src/users/services/checkemail.service';
import { GetUserRolesService } from 'src/users/services/getuserroles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [
    FindUserByEmailService,
    FindAllUsersService,
    CreateUserService,
    UpdateUserService,
    CheckEmailService,
    GetUserRolesService,
  ],
  controllers: [UsersController],
  exports: [
    FindUserByEmailService,
    FindAllUsersService,
    CreateUserService,
    UpdateUserService,
    CheckEmailService,
    GetUserRolesService,
  ],
})
export class UsersModule {}
