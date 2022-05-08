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
import { FindAllUsersService } from './services/findallusers.service';
import { FindUserByEmailService } from './services/finduserbyemail.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserUpdateDto } from './entities/dto/user.update.dto';
import { CheckEmailService } from './services/checkemail.service';
import { EmailDto } from './entities/dto/email.dto';
import { Role } from './entities/constants/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(
    private findAllUsersService: FindAllUsersService,
    private findUserByEmailService: FindUserByEmailService,
    private createUserService: CreateUserService,
    private updateUserService: UpdateUserService,
    private checkEmailService: CheckEmailService,
  ) {}

  @Get('/')
  async findAllUsers(): Promise<Users[]> {
    return this.findAllUsersService.execute();
  }

  @Get('/:email')
  async findUserByEmail(@Param('email') email: string): Promise<Users[]> {
    return this.findUserByEmailService.exec(email);
  }

  @Post('/')
  async createUser(
    @Res() res: Response,
    @Body() data: UserCreateDto,
  ): Promise<Response> {
    const result = await this.createUserService.exec(data);

    return res.status(HttpStatus.CREATED).send(result);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateUser(
    @Request() req,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: UserUpdateDto,
  ): Promise<Response> {
    const result = await this.updateUserService.exec(id, body, req.user);

    return res.status(HttpStatus.CREATED).send(result);
  }

  @Post('/checkemail')
  async checkEmailIsAvaible(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: EmailDto,
  ): Promise<Response> {
    const result = await this.checkEmailService.exec(body.email);

    return res.status(HttpStatus.CREATED).send(result);
  }

  // Testing validation pipe
  @Post('/testing/validationpipe')
  async testingValidationPipe(
    @Res() res: Response,
    @Body() data: UserCreateDto,
  ): Promise<Response> {
    return res.status(HttpStatus.CREATED).send(data);
  }

  @Get('/testing/role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async testingRole(@Res() res: Response): Promise<Response> {
    return res.status(HttpStatus.OK).send(Role.ADMIN);
  }
}
