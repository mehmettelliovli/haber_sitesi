import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly city: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  @IsPhoneNumber('TR')
  @Length(11)
  readonly phone: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly capacity: number;
}
