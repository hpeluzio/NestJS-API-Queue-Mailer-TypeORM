import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserCreateDto } from './entities/dto/user.create.dto';
import { Users } from './entities/users.entity';
import { CreateUserService } from './services/createuser.service';
import { UpdateUserService } from './services/updateuser.service';
import { FindAllService } from './services/findall.service';
import { FindOneService } from './services/findone.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserUpdateDto } from './entities/dto/user.update.dto';
import { CheckEmailService } from './services/checkemail.service';
import { EmailDto } from './entities/dto/email.dto';

@Controller('users')
export class UsersController {
  constructor(
    private findAllService: FindAllService,
    private findOneService: FindOneService,
    private createUserService: CreateUserService,
    private updateUserService: UpdateUserService,
    private checkEmailService: CheckEmailService,
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
    @Body() data: UserCreateDto,
  ): Promise<Response> {
    console.log(data);
    const result = await this.createUserService.exec(data);

    return res.status(HttpStatus.CREATED).send(result);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Request() req,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: UserUpdateDto,
  ): Promise<Response> {
    // console.log('req.user: ', req.user);
    // console.log('body: ', body);
    const result = await this.updateUserService.exec(id, body, req.user);

    return res.status(HttpStatus.CREATED).send(result);
  }

  @Post('/checkemail')
  async checkemail(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: EmailDto,
  ): Promise<Response> {
    console.log('checkemail body: ', body);

    const result = await this.checkEmailService.exec(body.email);

    return res.status(HttpStatus.CREATED).send(result);
  }

  // Testing validation pipe
  @Post('/testing')
  async testing(
    @Res() res: Response,
    @Body() data: UserCreateDto,
  ): Promise<Response> {
    console.log(data);

    return res.status(HttpStatus.CREATED).send(data);
  }
}
