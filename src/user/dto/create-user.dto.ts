import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
@Injectable()
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly lastName: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @IsPhoneNumber('TR')
  @Length(11)
  readonly phone: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;
}
