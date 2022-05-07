import { IsEmail } from 'class-validator';

export class EmailDto {
  @IsEmail({}, { message: 'Invalid email.' })
  email: string;
}
