import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  name: string;

  @IsEmail()
  @ValidateIf((o) => !o.phone)
  email: string;

  @IsPhoneNumber()
  @ValidateIf((o) => !o.email)
  phone: string;

  @IsString()
  password: string;
}
