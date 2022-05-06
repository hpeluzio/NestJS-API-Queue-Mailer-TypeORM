import { IsEmail, IsString, Length } from 'class-validator';

import { Match } from 'src/common/decorators/match.decorator';

export class UserCreateDto {
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @Length(6, 30, { message: 'Password deve ter entre 6 e 30 dígitos' })
  @IsString({ message: 'Envie uma passaword válida' })
  password: string;

  @Length(6, 30, { message: 'Password deve ter entre 6 e 30 dígitos' })
  @IsString({ message: 'Envie uma passaword válida' })
  @Match('password', { message: 'Senhas não conferem' })
  confirm_password: string;
}
