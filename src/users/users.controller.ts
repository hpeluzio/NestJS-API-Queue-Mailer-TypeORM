import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersCreateDto } from './entities/dto/user.create.dto';
import { Users } from './entities/users.entity';
import { CreateUserService } from './services/createuser.service';
import { UpdateUserService } from './services/updateuser.service';
import { FindAllService } from './services/findall.service';
import { FindOneService } from './services/findone.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersUpdateDto } from './entities/dto/user.update.dto';

@Controller('users')
export class UsersController {
  constructor(
    private findAllService: FindAllService,
    private findOneService: FindOneService,
    private createUserService: CreateUserService,
    private updateUserService: UpdateUserService,
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

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async update(
    @Request() req,
    @Res() res: Response,
    @Body() body: UsersUpdateDto,
  ): Promise<Response> {
    console.log('req.user: ', req.user);
    console.log('body: ', body);
    const result = await this.createUserService.exec(body);

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
