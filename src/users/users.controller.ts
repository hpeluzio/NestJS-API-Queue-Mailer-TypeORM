import { Controller, Get, Param } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { UsersService } from './services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  async findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get(':email')
  async findOne(@Param('email') email: string): Promise<Users[]> {
    return this.usersService.findOne(email);
  }
}
