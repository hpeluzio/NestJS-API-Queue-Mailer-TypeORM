import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersCreateDto } from './entities/dto/users.create.dto';
import { Users } from './entities/users.entity';
import { CreateUserService } from './services/createuser.service';
import { FindAllService } from './services/findall.service';
import { FindOneService } from './services/findone.service';

@Controller('users')
export class UsersController {
  constructor(
    private findAllService: FindAllService,
    private findOneService: FindOneService,
    private createUserService: CreateUserService,
  ) {}

  @Get('/')
  async findAll(): Promise<Users[]> {
    return this.findAllService.execute();
  }

  @Get(':email')
  async findOne(@Param('email') email: string): Promise<Users[]> {
    return this.findOneService.exec(email);
  }

  @Post('/')
  async create(
    @Res() res: Response,
    @Body() data: UsersCreateDto,
  ): Promise<Response> {
    console.log(data);
    const result = await this.createUserService.exec(data);

    return res.status(HttpStatus.CREATED).send(result);
  }

  // Testing validation pipe
  @Post('/testing')
  async testing(
    @Res() res: Response,
    @Body() data: UsersCreateDto,
  ): Promise<Response> {
    console.log(data);

    return res.status(HttpStatus.CREATED).send(data);
  }
}
