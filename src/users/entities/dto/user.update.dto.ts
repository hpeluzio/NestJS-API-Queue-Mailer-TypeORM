import { IsEmail, IsString, Length } from 'class-validator';

export class UserUpdateDto {
  @IsEmail()
  email: string;

  @Length(6, 20)
  @IsString()
  password: string;

  @Length(6, 20)
  @IsString()
  confirm_password: string;
}
