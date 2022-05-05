import { Controller, Get, Param } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { FindAllService } from './services/findall.service';
import { FindOneService } from './services/findone.service';

@Controller('users')
export class UsersController {
  constructor(
    private findAllService: FindAllService,
    private findOneService: FindOneService,
  ) {}

  @Get('/')
  async findAll(): Promise<Users[]> {
    return this.findAllService.execute();
  }

  @Get(':email')
  async findOne(@Param('email') email: string): Promise<Users[]> {
    return this.findOneService.exec(email);
  }
}
