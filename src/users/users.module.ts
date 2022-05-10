import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { FindAllUsersService } from './services/findallusers.service';
import { FindUserByEmailService } from './services/finduserbyemail.service';
import { CreateUserService } from './services/createuser.service';
import { UpdateUserService } from './services/updateuser.service';
import { CheckEmailService } from './services/checkemail.service';
import { GetUserRolesService } from './services/getuserroles.service';

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
